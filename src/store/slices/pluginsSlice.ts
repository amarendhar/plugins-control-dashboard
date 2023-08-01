import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "store";
import { PLUGINS_BASE_URL } from "globalConstants";
import { Maybe, STATUS } from "types";
import mockPlugins from "mocks/__fixtures__/mockPlugins.json";

export type TabsEntry = typeof mockPlugins.data.tabs;
export type TabDataEntry = typeof mockPlugins.data.tabdata;
export type PluginsEntry = typeof mockPlugins.data.plugins;
export type PluginEntry = typeof mockPlugins.data.plugins.plugin1;

export type PluginsState = {
  data: Maybe<typeof mockPlugins.data>;
  error: Maybe<string | undefined>;
  status: STATUS;
};

const initialState: PluginsState = {
  data: null,
  error: null,
  status: STATUS.IDLE,
};

export const fetchPlugins = createAsyncThunk(
  "plugins/fetchPlugins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${PLUGINS_BASE_URL}/plugins`);
      const data = await response.json();

      if (!data || data?.errors) {
        throw new Error("Data not found");
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const pluginsSlice = createSlice({
  name: "plugins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlugins.pending, (state) => {
        state.status = STATUS.PENDING;
        state.error = null;
      })
      .addCase(fetchPlugins.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.error = null;
        state.status = STATUS.FULFILLED;
      })
      .addCase(fetchPlugins.rejected, (state, action) => {
        state.data = null;
        state.error = action.payload as string;
        state.status = STATUS.REJECTED;
      });
  },
});

export const selectPlugin = (state: AppState) => state.plugins;

export default pluginsSlice.reducer;
