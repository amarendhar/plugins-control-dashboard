import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PLUGINS_BASE_URL } from "globalConstants";
import { PluginStatus, PluginsDataEntry } from "types";

export const api = createApi({
  reducerPath: "pluginsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: PLUGINS_BASE_URL }),
  endpoints: (builder) => ({
    fetchPlugins: builder.query<PluginsDataEntry, void>({
      query: () => "plugins",
    }),
    updatePlugin: builder.mutation<
      {
        success?: boolean;
        error?: string;
      },
      { pluginId: string; data: { tabId: string; status: PluginStatus } }
    >({
      query: ({ pluginId, data }) => ({
        url: `plugins/${pluginId}`,
        method: "POST",
        body: data,
      }),
    }),
    updatePlugins: builder.mutation<
      {
        success?: boolean;
        error?: string;
      },
      { data: { status: PluginStatus.Disabled | PluginStatus.Enabled } }
    >({
      query: ({ data }) => ({
        url: `plugins`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchPluginsQuery,
  useUpdatePluginMutation,
  useUpdatePluginsMutation,
} = api;
