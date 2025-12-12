import { styled, Typography } from '@mui/material'
import { ExternalLink as ExternalLinkIcon } from '@prenda-school/prenda-icons'

export interface ExternalLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
}

export const ExternalLink = ({ label, ...props }: ExternalLinkProps) => {
  return (
    <Root {...props}>
      <Typography variant="label">{label}</Typography>
      <ExternalLinkIcon />
    </Root>
  )
}

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: theme.palette.prendaBlue[600],
  cursor: 'pointer',
  width: 'fit-content',
  '&:hover': {
    color: theme.palette.prendaGrey[90],
  },
}))
