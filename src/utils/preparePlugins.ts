import { PluginData, PluginStatus, TabDataEntry, PluginsEntry } from "types";

type PreparePluginsProps = {
  data: any;
  tabId?: string;
};

export const preparePlugins = ({ data, tabId }: PreparePluginsProps) => {
  if (!data || !tabId || !data?.tabdata?.[tabId as keyof TabDataEntry]) {
    return [];
  }

  const {
    active: activePluginIds,
    inactive: inactivePluginIds,
    disabled: disabledPluginIds,
  } = data.tabdata[tabId as keyof TabDataEntry];

  const activePlugins = mapPluginsWithStatus({
    plugins: data.plugins,
    tabId,
    pluginIds: activePluginIds,
    status: PluginStatus.Active,
  });
  const inactivePlugins = mapPluginsWithStatus({
    plugins: data.plugins,
    tabId,
    pluginIds: inactivePluginIds,
    status: PluginStatus.Inactive,
  });

  const enabledPlugins = [...activePlugins, ...inactivePlugins];

  // @ts-ignore
  const disabledPlugins = disabledPluginIds.reduce((acc, disabledPluginId) => {
    const enabledPlugin = enabledPlugins.find(
      (enabledPlugin) => enabledPlugin.id === disabledPluginId
    );

    if (enabledPlugin) {
      enabledPlugin.status.push(PluginStatus.Disabled);
    } else {
      const plugin = data.plugins[disabledPluginId as keyof PluginsEntry];

      acc.push({
        ...plugin,
        id: disabledPluginId,
        status: [PluginStatus.Inactive, PluginStatus.Disabled],
        tabId,
      });
    }

    return acc;
  }, [] as PluginData[]);

  return [...activePlugins, ...inactivePlugins, ...disabledPlugins].sort(
    (a, b) => a.title.localeCompare(b.title)
  );
};

type MapPluginsWithStatusProps = {
  pluginIds: string[];
  status: PluginStatus;
  tabId: string;
  plugins: PluginsEntry;
};

const mapPluginsWithStatus = ({
  plugins,
  tabId,
  pluginIds,
  status,
}: MapPluginsWithStatusProps) => {
  return pluginIds.map((pluginId) => {
    const plugin = plugins[pluginId as keyof PluginsEntry];

    return {
      ...plugin,
      id: pluginId,
      status: [status],
      tabId,
    };
  });
};
