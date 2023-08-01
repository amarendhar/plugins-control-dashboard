import { rest } from "msw";
import { PLUGINS_BASE_URL } from "globalConstants";
import mockPlugins from "mocks/__fixtures__/mockPlugins.json";

const DELAY = 150;

export const handlers = [
  rest.get(`${PLUGINS_BASE_URL}/plugins`, (req, res, ctx) => {
    return res(ctx.json(mockPlugins), ctx.delay(DELAY));
  }),
];
