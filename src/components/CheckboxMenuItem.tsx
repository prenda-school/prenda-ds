import {
  Checkbox,
  type CheckboxProps,
  MenuItem,
  type MenuItemProps,
  styled,
} from "@mui/material"
import { PrendaGreys } from "../colors"

export interface CheckboxMenuItemProps extends MenuItemProps {
  /**
   * Props applied to the `Checkbox` element. `checked` defaults to the menu
   * item's `selected` state.
   */
  CheckboxProps?: CheckboxProps
  /**
   * Indent the item one level, for options under a select-all parent.
   */
  nested?: boolean
}

export const CheckboxMenuItem = ({
  children,
  CheckboxProps: checkboxProps,
  nested = false,
  selected,
  ...other
}: CheckboxMenuItemProps) => (
  <Root nested={nested} selected={selected} {...other}>
    <Checkbox
      checked={selected}
      disableRipple
      tabIndex={-1}
      {...checkboxProps}
    />
    {children}
  </Root>
)

const Root = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== "nested",
})<{ nested?: boolean }>(({ nested }) => ({
  gap: 8,
  paddingLeft: nested ? 40 : 16,
  whiteSpace: "nowrap",
  // only the checkbox should appear selected
  "&.Mui-selected": {
    backgroundColor: "transparent",
    color: PrendaGreys[500],
  },
  "&.Mui-selected:hover": {
    backgroundColor: PrendaGreys[70],
  },
}))
