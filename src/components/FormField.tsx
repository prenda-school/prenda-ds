import { Grid2 as Grid, styled } from '@mui/material'

export const FormField = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}))
