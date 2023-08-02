import mockPlugins from "mocks/__fixtures__/mockPlugins.json";

export type Maybe<T> = T | null;

export enum ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export type PluginsDataEntry = typeof mockPlugins.data;
export type TabsEntry = typeof mockPlugins.data.tabs;
export type TabDataEntry = typeof mockPlugins.data.tabdata;
export type PluginsEntry = typeof mockPlugins.data.plugins;
export type PluginEntry = typeof mockPlugins.data.plugins.plugin1;

export enum PluginStatus {
  Active = "active",
  Inactive = "inactive",
  Enabled = "enabled",
  Disabled = "disabled",
}

export type PluginData = {
  id: string;
  title: string;
  description: string;
  status: PluginStatus[];
  tabId: string;
};
