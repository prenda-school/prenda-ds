import { Typography, type TypographyProps, styled } from "@mui/material"
import type { HTMLAttributes, ReactNode } from "react"

export const contentGroupClasses = {
  root: "PrendaContentGroup-root",
  leadingAction: "PrendaContentGroup-leadingAction",
  leadingEl: "PrendaContentGroup-leadingEl",
  typography: "PrendaContentGroup-typography",
  primary: "PrendaContentGroup-primary",
  secondary: "PrendaContentGroup-secondary",
  tertiary: "PrendaContentGroup-tertiary",
  trailingEl: "PrendaContentGroup-trailingEl",
  trailingAction: "PrendaContentGroup-trailingAction",
} as const

export type ContentGroupClassKey = keyof typeof contentGroupClasses

export interface ContentGroupProps extends HTMLAttributes<HTMLDivElement> {
  alignItems?: "baseline" | "center" | "flex-end" | "flex-start" | "stretch"
  /**
   * Disable the default root padding.
   */
  disablePadding?: boolean
  /**
   * Indent the typography elements -- usually when no leading element is
   * supplied, to align with sibling groups that have one.
   */
  inset?: boolean
  /**
   * Display the typography elements in a row instead of a column.
   */
  row?: boolean
  /**
   * Action element placed before the leading element.
   */
  leadingAction?: ReactNode
  /**
   * Element placed before the typography elements, usually an avatar or icon.
   */
  leadingEl?: ReactNode
  /**
   * Element placed after the typography elements.
   */
  trailingEl?: ReactNode
  /**
   * Action element placed after the trailing element.
   */
  trailingAction?: ReactNode
  primary: ReactNode
  secondary?: ReactNode
  tertiary?: ReactNode
  primaryTypographyProps?: TypographyProps
  secondaryTypographyProps?: TypographyProps
  tertiaryTypographyProps?: TypographyProps
}

export const ContentGroup = ({
  alignItems = "flex-start",
  disablePadding = false,
  inset = false,
  row = false,
  leadingAction,
  leadingEl,
  trailingEl,
  trailingAction,
  primary,
  primaryTypographyProps,
  secondary,
  secondaryTypographyProps,
  tertiary,
  tertiaryTypographyProps,
  className,
  ...other
}: ContentGroupProps) => (
  <Root
    alignItems={alignItems}
    disablePadding={disablePadding}
    className={
      className
        ? `${contentGroupClasses.root} ${className}`
        : contentGroupClasses.root
    }
    {...other}
  >
    {leadingAction ? (
      <EdgeAction className={contentGroupClasses.leadingAction}>
        {leadingAction}
      </EdgeAction>
    ) : null}
    {leadingEl ? (
      <EdgeEl className={contentGroupClasses.leadingEl}>{leadingEl}</EdgeEl>
    ) : null}
    <TypographyGroup
      row={row}
      inset={inset}
      className={contentGroupClasses.typography}
    >
      <Typography
        component="span"
        className={contentGroupClasses.primary}
        sx={
          secondary
            ? { fontFamily: "Inter-SemiBold", fontWeight: 600 }
            : undefined
        }
        {...primaryTypographyProps}
      >
        {primary}
      </Typography>
      {secondary ? (
        <Typography
          component="p"
          className={contentGroupClasses.secondary}
          {...secondaryTypographyProps}
        >
          {secondary}
        </Typography>
      ) : null}
      {tertiary ? (
        <Typography
          component="p"
          variant="description"
          className={contentGroupClasses.tertiary}
          sx={{ opacity: 0.86 }}
          {...tertiaryTypographyProps}
        >
          {tertiary}
        </Typography>
      ) : null}
    </TypographyGroup>
    {trailingEl ? (
      <EdgeEl className={contentGroupClasses.trailingEl}>{trailingEl}</EdgeEl>
    ) : null}
    {trailingAction ? (
      <EdgeAction className={contentGroupClasses.trailingAction}>
        {trailingAction}
      </EdgeAction>
    ) : null}
  </Root>
)

const Root = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "alignItems" && prop !== "disablePadding",
})<Pick<ContentGroupProps, "alignItems" | "disablePadding">>(
  ({ alignItems, disablePadding }) => ({
    alignItems,
    backgroundColor: "transparent",
    columnGap: 16,
    display: "flex",
    padding: disablePadding ? 0 : "8px 16px",
    position: "relative",
    rowGap: 8,
  }),
)

const EdgeAction = styled("span")({
  display: "inline-flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  minHeight: "1em",
  minWidth: "1em",
})

const EdgeEl = styled("span")({
  display: "inline-flex",
  flexShrink: 0,
  maxWidth: "100%",
  color: "inherit",
  fontSize: 24,
})

const TypographyGroup = styled("span", {
  shouldForwardProp: (prop) => prop !== "row" && prop !== "inset",
})<Pick<ContentGroupProps, "row" | "inset">>(({ row, inset }) => ({
  alignItems: "baseline",
  columnGap: 8,
  display: "flex",
  flexDirection: row ? "row" : "column",
  ...(inset && { paddingInlineStart: 40 }),
}))
