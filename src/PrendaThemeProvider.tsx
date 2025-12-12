import { CssBaseline } from "@mui/material"
import { Theme, ThemeProvider } from "@mui/material/styles"
import React, { PropsWithChildren } from "react"
import { prendaTheme } from "./theme"

export type PrendaThemeProviderProps = PropsWithChildren<{
  /**
   * Optional prebuilt theme. Defaults to the bundled prendaTheme.
   */
  theme?: Theme
  /**
   * Toggle CssBaseline injection. Enabled by default.
   */
  includeCssBaseline?: boolean
}>

export const PrendaThemeProvider = ({
  children,
  theme = prendaTheme,
  includeCssBaseline = true,
}: PrendaThemeProviderProps) => (
  <ThemeProvider theme={theme}>
    {includeCssBaseline ? <CssBaseline /> : null}
    {children}
  </ThemeProvider>
)

export default PrendaThemeProvider
