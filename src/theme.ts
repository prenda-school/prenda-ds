import { outlinedInputClasses } from "@mui/material"
import { type Theme, createTheme } from "@mui/material/styles"
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Cross,
  Info,
} from "@prenda-school/prenda-icons"
import React from "react"
import {
  PrendaBlues,
  PrendaGreens,
  PrendaGreys,
  PrendaMagentas,
  PrendaPurple,
  PrendaReds,
  PrendaYellows,
} from "./colors"

declare module "@mui/material/styles" {
  // #region Custom typography variants
  interface TypographyVariants {
    label: React.CSSProperties
    description: React.CSSProperties
    T18: React.CSSProperties
    T22: React.CSSProperties
    T28: React.CSSProperties
    T32: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    label?: React.CSSProperties
    description?: React.CSSProperties
    T18?: React.CSSProperties
    T22?: React.CSSProperties
    T28?: React.CSSProperties
    T32?: React.CSSProperties
  }
  // #endregion Custom typography variants

  // #region Custom button variants
  interface ButtonVariants {
    primary: React.CSSProperties
    stroke: React.CSSProperties
    ghost: React.CSSProperties
  }

  interface ButtonVariantsOptions {
    primary?: React.CSSProperties
    stroke?: React.CSSProperties
    ghost?: React.CSSProperties
  }
  // #endregion Custom typography variants
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    label: true
    description: true
    T18: true
    T22: true
    T28: true
    T32: true
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true
    stroke: true
    ghost: true
  }

  interface ButtonPropsColorOverrides {
    prendaBlue: true
    prendaGrey: true
    prendaRed: true
    prendaYellow: true
    prendaGreen: true
    prendaMagenta: true
  }
}

// #region Custom palette
// Allow prenda palette keys on the theme and Button color prop
// so consumers get proper typing when using the extended palette.
declare module "@mui/material/styles" {
  interface Palette {
    prendaBlue: Palette["primary"]
    prendaGrey: Palette["primary"]
    prendaRed: Palette["primary"]
    prendaYellow: Palette["primary"]
    prendaGreen: Palette["primary"]
    prendaMagenta: Palette["primary"]
    prendaPurple: Palette["primary"]
  }

  interface PaletteOptions {
    prendaBlue?: PaletteOptions["primary"]
    prendaGrey?: PaletteOptions["primary"]
    prendaRed?: PaletteOptions["primary"]
    prendaYellow?: PaletteOptions["primary"]
    prendaGreen?: PaletteOptions["primary"]
    prendaMagenta?: PaletteOptions["primary"]
    prendaPurple?: PaletteOptions["primary"]
  }
}
// #endregion Custom palette

// #region Palette Color
declare module "@mui/material/styles" {
  interface PaletteColor {
    0?: string
    40?: string
    60?: string
    70?: string
    80?: string
    90?: string
    100?: string
    200?: string
    300?: string
    400?: string
    500?: string
    600?: string
    700?: string
  }

  interface SimplePaletteColorOptions {
    0?: string
    40?: string
    60?: string
    70?: string
    80?: string
    90?: string
    100?: string
    200?: string
    300?: string
    400?: string
    500?: string
    600?: string
    700?: string
  }
}
// #endregion Palette Color

// #region SvgIcon variants
declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsSizeOverrides {
    huge: true
  }
}
// #endregion SvgIcon variants

export type CreatePrendaThemeOptions = {
  /**
   * Base path for hosted font files referenced by CssBaseline.
   * Defaults to "/pds-assets-v1/fonts".
   */
  fontBasePath?: string
}

const fontFaceCss = (fontBasePath: string) => `
  @font-face {
    font-family: 'Inter-Regular';
    font-style: normal;
    font-display: swap;
    font-weight: normal;
    src: local('Inter-Regular'), local('Inter-Regular'), url("${fontBasePath}/inter-regular.woff2") format('woff2');
    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  @font-face {
    font-family: 'Inter-Medium';
    font-style: normal;
    font-display: swap;
    font-weight: normal;
    src: local('Inter-Medium'), local('Inter-Medium'), url("${fontBasePath}/inter-medium.woff2") format('woff2');
    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  @font-face {
    font-family: 'Inter-SemiBold';
    font-style: normal;
    font-display: swap;
    font-weight: normal;
    src: local('Inter-SemiBold'), local('Inter-SemiBold'), url("${fontBasePath}/inter-semibold.woff2") format('woff2');
    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  @font-face {
    font-family: 'Inter-Bold';
    font-style: normal;
    font-display: swap;
    font-weight: normal;
    src: local('Inter-Bold'), local('Inter-Bold'), url("${fontBasePath}/inter-bold.woff2") format('woff2');
    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  @font-face {
    font-family: 'Poppins-SemiBold';
    font-style: normal;
    font-display: swap;
    font-weight: normal;
    src: local('Poppins-SemiBold'), local('Poppins-SemiBold'), url("${fontBasePath}/poppins-semibold.woff2") format('woff2');
    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
  @font-face {
    font-family: 'Poppins-Bold';
    font-style: normal;
    font-display: swap;
    font-weight: normal;
    src: local('Poppins-Bold'), local('Poppins-Bold'), url("${fontBasePath}/poppins-bold.woff2") format('woff2');
    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
  }
`

export const createPrendaTheme = (
  options: CreatePrendaThemeOptions = {},
): Theme => {
  const fontBasePath = options.fontBasePath ?? "/pds-assets-v1/fonts"

  const baseTheme = createTheme()
  // Preserve default shadow tuple typing while customizing a few entries
  const shadows = [...baseTheme.shadows] as Theme["shadows"]
  shadows[1] = "0px 1px 1px 0px rgba(9, 30, 66, 0.16)"
  shadows[2] = "0px 3px 5px 0px rgba(9, 30, 66, 0.16)"
  shadows[3] = "0px 8px 12px 0px rgba(9, 30, 66, 0.16)"
  shadows[24] =
    "0px 1px 5px -7px rgba(9, 30, 66, 0.16), 0px 14px 30px 4px rgba(9, 30, 66, 0.16)"

  return createTheme({
    cssVariables: true,
    palette: {
      action: {
        disabled: PrendaGreys[100],
      },
      prendaBlue: {
        100: PrendaBlues[100],
        200: PrendaBlues[200],
        300: PrendaBlues[300],
        400: PrendaBlues[400],
        500: PrendaBlues[500],
        600: PrendaBlues[600],
        700: PrendaBlues[700],
      },
      prendaGrey: {
        0: PrendaGreys[0],
        40: PrendaGreys[40],
        60: PrendaGreys[60],
        70: PrendaGreys[70],
        80: PrendaGreys[80],
        90: PrendaGreys[90],
        100: PrendaGreys[100],
        200: PrendaGreys[200],
        300: PrendaGreys[300],
        400: PrendaGreys[400],
        500: PrendaGreys[500],
        600: PrendaGreys[600],
      },
      prendaRed: {
        100: PrendaReds[100],
        300: PrendaReds[300],
        400: PrendaReds[400],
        500: PrendaReds[500],
        700: PrendaReds[700],
      },
      prendaYellow: {
        100: PrendaYellows[100],
        200: PrendaYellows[200],
        300: PrendaYellows[300],
        400: PrendaYellows[400],
        500: PrendaYellows[500],
        600: PrendaYellows[600],
        700: PrendaYellows[700],
      },
      prendaGreen: {
        100: PrendaGreens[100],
        200: PrendaGreens[200],
        300: PrendaGreens[300],
        700: PrendaGreens[700],
      },
      prendaMagenta: {
        100: PrendaMagentas[100],
        200: PrendaMagentas[200],
        300: PrendaMagentas[300],
        400: PrendaMagentas[400],
        500: PrendaMagentas[500],
        700: PrendaMagentas[700],
      },
      prendaPurple: {
        100: PrendaPurple[100],
        200: PrendaPurple[200],
        300: PrendaPurple[300],
        400: PrendaPurple[400],
        500: PrendaPurple[500],
        600: PrendaPurple[600],
        700: PrendaPurple[700],
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily:
        "Inter-Regular, Inter-Medium, Inter-SemiBold, Poppins-SemiBold, Poppins-Bold, Arial",
      label: {
        fontFamily: "Inter-SemiBold",
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "20px",
      },
      description: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: "20px",
      },
      T18: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        fontWeight: 600,
        lineHeight: "28px",
      },
      T22: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 22,
        fontWeight: 600,
        lineHeight: "28px",
      },
      T28: {
        fontFamily: "Poppins-Bold",
        fontSize: 28,
        fontWeight: 700,
        lineHeight: "36px",
      },
      T32: {
        fontFamily: "Poppins-Bold",
        fontSize: 32,
        fontWeight: 700,
        lineHeight: "40px",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: fontFaceCss(fontBasePath),
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            label: "p",
            description: "p",
            T18: "p",
            T22: "p",
            T28: "p",
            T32: "p",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          fontSizeSmall: {
            fontSize: 16,
          },
          fontSizeMedium: {
            fontSize: 24,
          },
          fontSizeLarge: {
            fontSize: 32,
          },
        },
        variants: [
          {
            props: { fontSize: "huge" },
            style: {
              fontSize: 104,
            },
          },
        ],
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "Inter-Medium",
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 4,
            "&.Mui-disabled": {
              backgroundColor: PrendaGreys[80],
              color: PrendaGreys[100],
              border: `1px solid ${PrendaGreys[90]}`,
            },
          },
          startIcon: {
            marginLeft: 0,
            "*:nth-of-type(1)": {
              fontSize: 24,
            },
          },
        },
        variants: [
          {
            props: { variant: "primary" },
            style: {
              backgroundColor: PrendaBlues[700],
              color: PrendaGreys[0],
              border: `1px solid ${PrendaBlues[700]}`,
              "&:hover": {
                backgroundColor: PrendaBlues[400],
              },
              "&:active": {
                backgroundColor: PrendaGreys[500],
              },
              "&.Mui-disabled": {
                backgroundColor: PrendaGreys[80],
                color: PrendaGreys[100],
                border: `1px solid ${PrendaGreys[80]}`,
              },
            },
          },
          {
            props: { variant: "stroke" },
            style: {
              backgroundColor: PrendaGreys[0],
              color: PrendaBlues[700],
              border: `1px solid ${PrendaGreys[90]}`,
              "&:hover": {
                backgroundColor: PrendaGreys[70],
              },
              "&:active": {
                backgroundColor: PrendaBlues[100],
              },
            },
          },
          {
            props: { variant: "ghost" },
            style: {
              backgroundColor: PrendaGreys[0],
              color: PrendaBlues[700],
              border: `1px solid ${PrendaGreys[0]}`,
              "&:hover": {
                backgroundColor: PrendaGreys[70],
              },
              "&:active": {
                backgroundColor: PrendaBlues[100],
              },
              "&.Mui-disabled": {
                border: `1px solid ${PrendaGreys[0]}`,
              },
            },
          },
          {
            props: { size: "small" },
            style: {
              fontSize: 14,
              padding: "8px 16px",
              lineHeight: "16px",
            },
          },
          {
            props: { size: "medium" },
            style: {
              fontSize: 16,
              padding: "12px 24px",
              lineHeight: "24px",
            },
          },
          {
            props: { size: "large" },
            style: {
              fontSize: 18,
              padding: "20px 32px",
              lineHeight: "24px",
            },
          },
        ],
        defaultProps: {
          disableFocusRipple: true,
          disableRipple: true,
          variant: "primary",
          size: "medium",
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: PrendaGreys[600],
            color: PrendaGreys[80],
            maxWidth: 256,
            borderRadius: 8,
            padding: 8,
            fontSize: 16,
            border: `1px solid ${PrendaGreys[600]}`,
          },
          arrow: {
            color: PrendaGreys[600],
            fontSize: 16,
          },
          tooltipPlacementBottom: {
            "& .MuiTooltip-arrow": {
              "&:before": {
                borderRadius: "3px 0 0 0",
              },
            },
          },
          tooltipPlacementTop: {
            "& .MuiTooltip-arrow": {
              "&:before": {
                borderRadius: "0 0 3px 0",
              },
            },
          },
          tooltipPlacementLeft: {
            "& .MuiTooltip-arrow": {
              "&:before": {
                borderRadius: "0 3px 0 0",
              },
            },
          },
          tooltipPlacementRight: {
            "& .MuiTooltip-arrow": {
              "&:before": {
                borderRadius: "0 0 0 3px",
              },
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            padding: "12px 0 24px",
          },
        },
        defaultProps: {
          slotProps: {
            backdrop: {
              sx: {
                backgroundColor: "rgba(9, 30, 66, 0.8)",
              },
            },
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins-SemiBold",
            fontSize: 22,
            fontWeight: 600,
            lineHeight: "28px",
            color: PrendaGreys[500],
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            paddingBottom: 16,
          },
        },
      },
      MuiDialogContentText: {
        styleOverrides: {
          root: {
            color: PrendaGreys[600],
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: "0 24px",
            "& > :not(style) ~ :not(style)": {
              marginLeft: 0,
            },
            gap: 8,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: PrendaGreys[100],
          },
          root: {
            color: PrendaGreys[500],
            padding: 0,
            borderRadius: 4,
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: PrendaGreys[90],
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: PrendaBlues[600],
              boxShadow: `0px 0px 0px 4px ${PrendaBlues[100]}`,
            },
            [`&.Mui-error .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: PrendaReds[700],
              boxShadow: `0px 0px 0px 4px ${PrendaReds[100]}`,
            },
            [`&.Mui-disabled .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: PrendaGreys[90],
            },
            "&.Mui-disabled": {
              backgroundColor: PrendaGreys[80],
            },
          },
          input: {
            padding: "13.5px 16px",
            color: PrendaGreys[500],
            backgroundColor: PrendaGreys[60],
            "&.Mui-disabled": {
              color: PrendaGreys[100],
              WebkitTextFillColor: PrendaGreys[100],
            },
          },
          adornedStart: {
            paddingLeft: 16,
            svg: {
              marginRight: 0,
            },
          },
          adornedEnd: {
            paddingRight: 8,
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: 14,
            color: PrendaGreys[400],
            "&.Mui-error": {
              color: PrendaReds[700],
            },
          },
        },
      },
      MuiStepLabel: {
        styleOverrides: {
          root: {
            padding: 0,
          },
          label: {
            fontWeight: 700,
            fontFamily: "Inter-Bold",
            fontSize: 16,
            "&.Mui-active": {
              color: PrendaGreys[600],
            },
            "&.Mui-completed": {
              color: PrendaGreys[600],
            },
            "&.Mui-disabled": {
              color: PrendaGreys[90],
            },
          },
          iconContainer: {
            paddingRight: 12,
            "&.Mui-disabled": {
              svg: {
                fill: PrendaGreys[80],
                border: `1px solid ${PrendaGreys[90]}`,
                text: {
                  fill: PrendaGreys[100],
                },
              },
            },
          },
        },
      },
      MuiStepConnector: {
        styleOverrides: {
          root: { marginLeft: 20 },
          lineVertical: { minHeight: 36, borderColor: PrendaGreys[80] },
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          root: {
            width: 40,
            height: 40,
            borderRadius: "50%",

            "&.Mui-active": {
              color: PrendaBlues[600],
              border: "none",
              text: {
                fill: PrendaGreys[0],
              },
            },
            "&.Mui-completed": {
              color: PrendaBlues[600],
              border: "none",
            },
          },
          text: {
            fontFamily: "Poppins-SemiBold",
            transform: "translateY(1px)",
          },
        },
      },
      MuiStepContent: {
        styleOverrides: {
          root: {
            marginLeft: 20,
            paddingLeft: 32,
            paddingRight: 0,
            borderLeft: `1px solid ${PrendaGreys[80]}`,
          },
          last: {
            borderLeft: "none",
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            "&.Mui-expanded": {
              margin: 0,
            },
            "&.Mui-disabled": {
              backgroundColor: PrendaGreys[0],
              color: PrendaGreys[90],
            },
            "::before": { backgroundColor: PrendaGreys[0] },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            minHeight: 24,
            padding: 0,
            "&.Mui-expanded": {
              minHeight: 24,
            },
          },
          content: {
            margin: 0,
            "&.Mui-expanded": {
              margin: 0,
            },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            padding: "16px 0px 12px",
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          flexContainer: {
            borderBottom: `2px solid ${PrendaGreys[80]}`,
          },
          indicator: {
            backgroundColor: PrendaBlues[600],
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontFamily: "Inter-SemiBold",
            fontWeight: 600,
            fontSize: 16,
            textTransform: "none",
            color: PrendaGreys[500],
            "&.Mui-selected": {
              color: PrendaGreys[500],
            },
            "&:hover": {
              backgroundColor: PrendaGreys[70],
              borderRadius: "4px 4px 0 0",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            "&.Mui-disabled": {
              backgroundColor: PrendaGreys[80],
              color: PrendaGreys[100],
              borderColor: PrendaGreys[90],
            },
          },
          icon: {
            color: PrendaGreys[500],
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            borderColor: PrendaGreys[90],
            backgroundColor: PrendaGreys[0],
            color: PrendaGreys[500],
            fontFamily: "Inter-SemiBold",
            fontWeight: 600,
            fontSize: 16,
            "&.Mui-selected": {
              backgroundColor: PrendaBlues[600],
              borderColor: PrendaBlues[600],
              color: PrendaGreys[0],
              "&:hover": {
                backgroundColor: PrendaBlues[600],
                borderColor: PrendaBlues[600],
                color: PrendaGreys[0],
              },
            },
          },
        },
      },
      MuiAlert: {
        defaultProps: {
          iconMapping: {
            info: React.createElement(Info),
            warning: React.createElement(AlertTriangle),
            error: React.createElement(AlertOctagon),
            success: React.createElement(CheckCircle),
          },
          components: {
            CloseIcon: Cross,
          },
        },
        styleOverrides: {
          root: {
            boxShadow: "0px 0px 1px 0px rgba(7, 46, 68, 0.16)",
            color: PrendaGreys[600],
            padding: "16px 24px",
          },
          action: {
            width: 24,
            height: 24,
            padding: 0,
            margin: 0,
            ".MuiSvgIcon-root": {
              width: 24,
              height: 24,
            },
          },
          standardInfo: {
            backgroundColor: PrendaBlues[100],
            border: `1px solid ${PrendaBlues[600]}`,
            "& .MuiAlert-icon": {
              color: PrendaBlues[600],
            },
            "& .MuiAlert-action": {
              color: PrendaBlues[600],
            },
          },
          standardWarning: {
            backgroundColor: PrendaYellows[100],
            border: `1px solid ${PrendaYellows[700]}`,
            "& .MuiAlert-icon": {
              color: PrendaYellows[700],
            },
            "& .MuiAlert-action": {
              color: PrendaYellows[700],
            },
          },
          standardError: {
            backgroundColor: PrendaReds[100],
            border: `1px solid ${PrendaReds[700]}`,
            borderColor: PrendaReds[700],
            "& .MuiAlert-icon": {
              color: PrendaReds[700],
            },
            "& .MuiAlert-action": {
              color: PrendaReds[700],
            },
          },
          standardSuccess: {
            backgroundColor: PrendaGreens[100],
            border: `1px solid ${PrendaGreens[700]}`,
            borderColor: PrendaGreens[700],
            "& .MuiAlert-icon": {
              color: PrendaGreens[700],
            },
            "& .MuiAlert-action": {
              color: PrendaGreens[700],
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: PrendaGreys[200],
            padding: "0px 8px",
            "&.Mui-checked": {
              color: PrendaBlues[600],
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: PrendaGreys[200],
            padding: "0px 8px",
            "&.Mui-checked": {
              color: PrendaBlues[600],
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 56,
            height: 32,
            padding: 4,
            borderRadius: 100,
          },
          switchBase: {
            padding: 0,
            margin: 6.75,

            "&.Mui-focusVisible + .MuiSwitch-track": {
              boxShadow: `0px 0px 4px 4px ${PrendaBlues[200]}`,
            },

            "&.Mui-checked": {
              transform: "translateX(24px)",
              color: "#fff",
              "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: PrendaBlues[600],
              },
              "&:hover + .MuiSwitch-track": {
                backgroundColor: PrendaBlues[500],
              },
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              color: PrendaGreys[90],
              boxShadow: "none",
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: 1,
              backgroundColor: PrendaGreys[80],
            },
          },
          thumb: {
            width: 18,
            height: 18,
            borderRadius: 100,
            boxShadow: "0 4px 4px 0 rgb(7 46 68 0.16)",
          },
          track: {
            borderRadius: 100,
            opacity: 1,
            backgroundColor: PrendaGreys[80],
            transition: baseTheme.transitions.create(
              ["background-color", "box-shadow"],
              {
                duration: 300,
              },
            ),
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: 0,
            paddingRight: 0,
            [baseTheme.breakpoints.up("sm")]: {
              paddingLeft: 0,
              paddingRight: 0,
            },
            [baseTheme.breakpoints.up("md")]: {
              paddingLeft: 0,
              paddingRight: 0,
            },
            [baseTheme.breakpoints.up("lg")]: {
              paddingLeft: 0,
              paddingRight: 0,
            },
            [baseTheme.breakpoints.up("xl")]: {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        },
      },
    },
    shadows,
  })
}

export const prendaTheme = createPrendaTheme()
export type PrendaTheme = typeof prendaTheme
export default prendaTheme
