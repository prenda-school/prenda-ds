import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

export const LinkTypography = styled(Typography)(
  ({ theme }) => `
  color: ${theme.palette.prendaBlue[600]};
  cursor: pointer;
  font-size: 14px;
`,
)
