import { Select, type SelectProps } from "@mui/material"
import { ChevronDown } from "@prenda-school/prenda-icons"

export const StyledSelect = ({ children, ...props }: SelectProps) => {
  return (
    <Select IconComponent={ChevronDown} displayEmpty {...props}>
      {children}
    </Select>
  )
}
