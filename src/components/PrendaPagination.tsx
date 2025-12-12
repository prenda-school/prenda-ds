import { Pagination, type PaginationProps } from '@mui/material'

export const PrendaPagination = ({ ...props }: PaginationProps) => {
  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      size="large"
      sx={{ marginLeft: 'auto', mt: 0.5 }}
      {...props}
    />
  )
}
