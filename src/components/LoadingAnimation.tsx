import { styled } from '@mui/material'
import type { CSSProperties } from 'react'

export type LoadingAnimationProps = {
  imgStyle?: CSSProperties
  style?: CSSProperties
  light?: boolean
}

export const LoadingAnimation = ({
  style = {},
  imgStyle = {},
  light = false,
}: LoadingAnimationProps) => (
  <LoaderContainer style={style}>
    <MonogramSpinner light={light} style={imgStyle} />
  </LoaderContainer>
)

const LoaderContainer = styled('div')`
  width: 100%;
  margin-top: 100px;
  display: block;
  text-align: center;

  svg {
    width: 150px;
    height: auto;
  }
`

const MonogramSpinner = ({
  light,
  style,
}: {
  light: boolean
  style?: CSSProperties
}) => {
  const fill = light ? '#fff' : '#004e75'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="monogram-spinner"
      viewBox="0 0 578.4 795.05"
      version="1.1"
      aria-label="Loading animation"
      role="img"
      style={style}
    >
      <style>
        {`
          .spark {
            animation: bounce-animation 1s ease-in-out infinite;
          }
          #leftspark {
            transform-origin: center;
            transform: rotate(-36deg);
          }
          #leftspark > rect {
            animation-delay: -0.2s;
          }
          #rightspark {
            transform-origin: center;
            transform: rotate(36deg);
          }
          #rightspark > rect {
            animation-delay: 0.2s;
          }
          @keyframes bounce-animation {
            0% { transform: translateY(0); }
            25% { transform: translateY(-50px); }
            50% { transform: translateY(0); }
          }
        `}
      </style>
      <path
        fill={fill}
        d="M361.51,375.29V485.77c0,59-13.39,85-51.9,85-29.71,0-44.36-19.67-51.05-34.74V650.25H216.71V294.51h41.85v30.56c6.69-15.07,21.34-34.74,51.05-34.74C348.12,290.33,361.51,316.28,361.51,375.29ZM319.66,369c0-26.37-7.53-41-28.46-41-23,0-32.64,18.84-32.64,43.11V490c0,24.27,9.62,43.1,32.64,43.1,20.93,0,28.46-14.64,28.46-41Z"
        id="letter"
      />
      <rect
        fill={fill}
        className="spark"
        x="268.18"
        y="144.8"
        width="41.85"
        height="71.15"
        id="centerspark"
      />
      <g id="leftspark">
        <rect
          fill={fill}
          className="spark"
          x="268.18"
          y="144.8"
          width="41.85"
          height="71.15"
        />
      </g>
      <g id="rightspark">
        <rect
          fill={fill}
          className="spark"
          x="268.18"
          y="144.8"
          width="41.85"
          height="71.15"
        />
      </g>
    </svg>
  )
}
