import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "store/hooks";
import {
  fetchPlugins,
  selectPlugin,
  PluginsState,
} from "store/slices/pluginsSlice";
import { TabDataEntry } from "types";

type UseHomeReturnProps = {
  data: PluginsState["data"];
  error: PluginsState["error"];
  status: PluginsState["status"];
};

export const useHome = (): UseHomeReturnProps => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error, data = null } = useAppSelector(selectPlugin);

  useEffect(() => {
    dispatch(fetchPlugins());
  }, [dispatch]);

  useEffect(() => {
    const tabId = data?.tabs?.[0];

    if (data?.tabdata?.[tabId as keyof TabDataEntry]) {
      navigate(`plugins/${tabId}`);
    }
  }, [data, navigate]);

  return { data, error, status };
};
