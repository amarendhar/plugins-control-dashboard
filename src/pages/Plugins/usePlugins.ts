import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFetchPluginsQuery } from "store/api";
import { preparePlugins } from "utils";
import { Maybe, TabDataEntry, PluginsDataEntry, PluginData } from "types";

type UsePluginsReturnProps = {
  data?: Maybe<PluginsDataEntry>;
  error: string;
  isLoading: boolean;
  plugins: PluginData[];
  title: string;
};

export const usePlugins = (): UsePluginsReturnProps => {
  const { data, error, isLoading } = useFetchPluginsQuery();
  const { tabId } = useParams<{ tabId: string }>();

  const { plugins, title } = useMemo(() => {
    const title = data?.tabdata?.[tabId as keyof TabDataEntry]?.title;
    const plugins = preparePlugins({ data, tabId });

    return {
      title: title ? `${title} Plugins` : "",
      plugins,
    };
  }, [data, tabId]);

  return { data, error: error ? String(error) : "", isLoading, plugins, title };
};
