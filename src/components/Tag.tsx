import { styled } from '@mui/material'
import type { HTMLAttributes } from 'react'

export type TagSize = 'small'

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  color: string
  size?: TagSize
}

export const Tag = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'size',
})<TagProps>(({ color, size, theme }) => ({
  borderRadius: 4,
  backgroundColor: color,
  width: 'fit-content',
  color: theme.palette.prendaGrey[600],
  padding: size === 'small' ? '2px 12px' : '2px 8px',
  maxHeight: size === 'small' ? '24px' : '28px',
  fontSize: size === 'small' ? '12px' : '16px',
  fontWeight: size === 'small' ? 500 : 400,
  fontFamily: size === 'small' ? 'Inter-Medium' : 'Inter-Regular',
}))
