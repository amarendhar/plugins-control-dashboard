import { rest } from "msw";
import { PLUGINS_BASE_URL } from "globalConstants";
import { uniqueBy } from "utils";
import { PluginStatus, TabDataEntry } from "types";
import mockPlugins from "mocks/__fixtures__/mockPlugins.json";

const DELAY = 150;

export const handlers = [
  rest.get(`${PLUGINS_BASE_URL}/plugins`, (req, res, ctx) => {
    return res(ctx.json(mockPlugins.data), ctx.delay(DELAY));
  }),

  rest.post(`${PLUGINS_BASE_URL}/plugins/:pluginId`, async (req, res, ctx) => {
    const pluginId = req.params.pluginId as string;
    const { tabId, status } = await req.json();
    
    if (!pluginId || !tabId || !status) {
      return res(
        ctx.status(400),
        ctx.json({ error: "Missing required parameters." })
      );
    }

    const tabdata = mockPlugins?.data?.tabdata?.[tabId as keyof TabDataEntry];

    if (tabdata) {
      switch (status) {
        case PluginStatus.Active:
          if (!tabdata.active.includes(pluginId)) {
            tabdata.active.push(pluginId);
          }

          tabdata.inactive = tabdata.inactive.filter(
            (inactivePluginId) => inactivePluginId !== pluginId
          );

          break;
        case PluginStatus.Inactive:
          if (!tabdata.inactive.includes(pluginId)) {
            tabdata.inactive.push(pluginId);
          }

          tabdata.active = tabdata.active.filter(
            (inactivePluginId) => inactivePluginId !== pluginId
          );

          break;
        case PluginStatus.Disabled:
          if (!tabdata.disabled.includes(pluginId)) {
            tabdata.disabled.push(pluginId);
          }

          break;
        default:
          return res(
            ctx.status(400),
            ctx.json({ error: "Invalid status provided." })
          );
      }
    } else {
      return res(
        ctx.status(404),
        ctx.json({ error: "Tab not found in the mock data." })
      );
    }

    return res(ctx.json({ success: true }), ctx.delay(DELAY));
  }),

  rest.post(`${PLUGINS_BASE_URL}/plugins`, async (req, res, ctx) => {
    const { status } = await req.json();

    switch (status) {
      case PluginStatus.Disabled:
        mockPlugins.data.tabs.forEach((tabId) => {
          const tabdata =
            mockPlugins?.data?.tabdata?.[tabId as keyof TabDataEntry];

          if (tabdata.disabled) {
            tabdata.disabled = uniqueBy([
              ...tabdata.active,
              ...tabdata.inactive,
              ...tabdata.disabled,
            ]);
          }
        });

        break;
      case PluginStatus.Enabled:
        mockPlugins.data.tabs.forEach((tabId) => {
          const tabdata =
            mockPlugins?.data?.tabdata?.[tabId as keyof TabDataEntry];

          if (tabdata.disabled) {
            tabdata.disabled.forEach((disabledPluginId) => {
              if (
                !tabdata.active.includes(disabledPluginId) &&
                !tabdata.inactive.includes(disabledPluginId)
              ) {
                tabdata.inactive.push(disabledPluginId);
              }
            });
            tabdata.disabled = [];
          }
        });

        break;
      default:
        return res(
          ctx.status(400),
          ctx.json({ error: "Invalid status provided." })
        );
    }

    return res(ctx.json({ success: true }), ctx.delay(DELAY));
  }),
];
