import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchPluginsQuery } from "store/api";
import { Maybe, TabDataEntry, PluginsDataEntry } from "types";

type UseHomReturnProps = {
  data?: Maybe<PluginsDataEntry>;
  error: string;
  isLoading: boolean;
};

export const useHome = (): UseHomReturnProps => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useFetchPluginsQuery();

  useEffect(() => {
    const tabId = data?.tabs?.[0];

    if (data?.tabdata?.[tabId as keyof TabDataEntry]) {
      navigate(`plugins/${tabId}`);
    }
  }, [data, navigate]);

  return { data, error: error ? String(error) : "", isLoading };
};
