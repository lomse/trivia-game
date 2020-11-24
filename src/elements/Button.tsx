import * as React from 'react'

type ButtonProps = {
  className?: string
  type: 'info' | 'danger'
  handleOnClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      onClick={props.handleOnClick}
      className={`px-3 py-2 text-gray-100 ${props.className} ${
        props.type === 'info' ? ' bg-blue-400 ' : ' bg-red-400 '
      }`}>
      {props.children}
    </button>
  )
}
