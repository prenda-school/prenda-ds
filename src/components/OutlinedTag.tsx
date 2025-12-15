import { useTheme } from "@mui/material";
import type { ComponentProps } from "react";
import { Tag } from "./Tag";

export interface OutlinedTagProps
  extends Omit<ComponentProps<typeof Tag>, "color" | "children"> {
  label: string;
}

export const OutlinedTag = ({ label, ...props }: OutlinedTagProps) => {
  const theme = useTheme();
  const backgroundColor =
    theme.palette.prendaGrey[0] ?? theme.palette.common.white;
  const borderColor =
    theme.palette.prendaGrey[600] ?? theme.palette.text.primary;

  return (
    <Tag
      color={backgroundColor}
      style={{
        border: `1px solid ${borderColor}`,
        ...props.style,
      }}
      {...props}
    >
      {label}
    </Tag>
  );
};
