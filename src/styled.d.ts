import { defaultTheme } from "themes";

type Theme = typeof defaultTheme;

declare module "styled-components" {
  interface DefaultTheme extends Theme {}
}
