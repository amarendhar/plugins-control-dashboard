import { useMemo, useCallback } from "react";
import { useFetchPluginsQuery, useUpdatePluginsMutation } from "store/api";
import { isEqual } from "lodash";
import { uniqueBy } from "utils";
import { PluginStatus } from "types";

type Tab = Record<"id" | "title" | "icon", string>;

type UseNavbarReturnProps = {
  navItems: Tab[];
  isLoading: boolean;
  isAllEnabled: boolean;
  onChange: (value: boolean) => Promise<void>;
};

export const useNavbar = (): UseNavbarReturnProps => {
  const [updatePlugins] = useUpdatePluginsMutation();
  const { data, isLoading, refetch } = useFetchPluginsQuery();

  const { navItems, isAllEnabled } = useMemo(() => {
    if (!data?.tabs || !data?.tabdata) {
      return {
        navItems: [],
        isAllEnabled: true,
      };
    }

    let enabledPlugins: string[] = [];
    let disabledPlugins: string[] = [];

    const navItems = data.tabs.reduce((acc, tabId) => {
      const tab = data.tabdata[tabId as keyof typeof data.tabdata];
      enabledPlugins = [...enabledPlugins, ...tab.inactive, ...tab.disabled];
      disabledPlugins = [...disabledPlugins, ...tab.disabled];

      if (tab) {
        acc.push({
          id: tabId,
          title: tab.title,
          icon: tab.icon,
        });
      }
      return acc;
    }, [] as Tab[]);

    return {
      navItems,
      isAllEnabled: !isEqual(
        uniqueBy(enabledPlugins).sort(),
        uniqueBy(disabledPlugins).sort()
      ),
    };
  }, [data]);

  const onChange = useCallback(
    async (value: boolean) => {
      const response = await updatePlugins({
        data: {
          status: value ? PluginStatus.Enabled : PluginStatus.Disabled,
        },
      });

      // @ts-ignore
      if (response?.data?.success) {
        refetch();
      }
    },
    [refetch, updatePlugins]
  );

  return {
    navItems,
    isLoading,
    isAllEnabled,
    onChange,
  };
};
