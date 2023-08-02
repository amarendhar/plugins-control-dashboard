import { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "store/hooks";
import {
  fetchPlugins,
  selectPlugin,
  PluginsState,
} from "store/slices/pluginsSlice";
import { PluginData, TabDataEntry } from "types";
import { preparePlugins } from "utils";

type UsePluginsReturnProps = {
  data: PluginsState["data"];
  error: PluginsState["error"];
  status: PluginsState["status"];
  plugins: PluginData[];
  title: string;
};

export const usePlugins = (): UsePluginsReturnProps => {
  const { tabId } = useParams<{ tabId: string }>();
  const dispatch = useAppDispatch();
  const { status, error, data = null } = useAppSelector(selectPlugin);

  useEffect(() => {
    if (data) {
      return;
    }

    dispatch(fetchPlugins());
  }, [data, dispatch]);

  const { plugins, title } = useMemo(() => {
    const title = data?.tabdata?.[tabId as keyof TabDataEntry]?.title;
    const plugins = preparePlugins({ data, tabId });

    return {
      title: title ? `${title} Plugins` : "",
      plugins,
    };
  }, [data, tabId]);

  return { data, error, status, plugins, title };
};
