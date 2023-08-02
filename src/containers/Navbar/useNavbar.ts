import { useMemo } from "react";
import { useAppSelector } from "store/hooks";
import { selectPlugin, PluginsState } from "store/slices/pluginsSlice";

type Tab = Record<"id" | "title" | "icon", string>;

type UseNavbarReturnProps = {
  navItems: Tab[];
  error: PluginsState["error"];
  status: PluginsState["status"];
};

export const useNavbar = (): UseNavbarReturnProps => {
  const { status, error, data = null } = useAppSelector(selectPlugin);

  const navItems = useMemo(() => {
    if (!data?.tabs || !data?.tabdata) {
      return [];
    }

    return data.tabs.reduce((acc, tabId) => {
      const tab = data.tabdata[tabId as keyof typeof data.tabdata];

      if (tab) {
        acc.push({
          id: tabId,
          title: tab.title,
          icon: tab.icon,
        });
      }
      return acc;
    }, [] as Tab[]);
  }, [data]);

  return {
    navItems,
    error,
    status,
  };
};
