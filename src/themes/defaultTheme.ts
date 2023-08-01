import { spacing } from "./spacing";
import { shape } from "./shape";
import { shadows } from "./shadows";
import { typography } from "./typography";
import { breakpoints } from "./breakpoints";
import { lightPalette } from "./lightPalette";
import { transitions } from "./transitions";

/**
 * Theme was constructed based on Material-Ui guidelines
 *  refer https://mui.com/material-ui/customization/default-theme/
 */
export const defaultTheme = {
  palette: lightPalette,
  spacing,
  shape,
  shadows,
  typography,
  breakpoints,
  transitions,
};
