import * as React from 'react'
import { IconProps } from '../types/index'

interface ILoaderProps extends IconProps {
  label?: string
  labelClassName?: string
  style?: object
}

export const Loader: React.FC<ILoaderProps> = ({
  width,
  height,
  className,
  label,
  labelClassName,
  strokeColor,
  style,
}) => (
  <React.Fragment>
    <svg
      className={className}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto', ...style }}
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid">
      <circle
        cx="50"
        cy="50"
        r="32"
        strokeWidth="8"
        stroke={strokeColor}
        strokeDasharray="50.26548245743669 50.26548245743669"
        fill="none"
        strokeLinecap="round"
        transform="rotate(0.6858 50 50)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;1"
          values="0 50 50;360 50 50"></animateTransform>
      </circle>
    </svg>
    {label && <p className={labelClassName}>{label}</p>}
  </React.Fragment>
)
