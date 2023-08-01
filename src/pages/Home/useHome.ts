import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import {
  fetchPlugins,
  selectPlugin,
  PluginsState,
} from "store/slices/pluginsSlice";

type UseHomeReturnProps = {
  data: PluginsState["data"];
  error: PluginsState["error"];
  status: PluginsState["status"];
};

export const useHome = (): UseHomeReturnProps => {
  const dispatch = useAppDispatch();
  const { status, error, data = null } = useAppSelector(selectPlugin);

  useEffect(() => {
    dispatch(fetchPlugins());
  }, [dispatch]);

  return { data, error, status };
};
