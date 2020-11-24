import * as React from 'react'

type LayoutProps = {}

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="w-96 h-700 bg-gray-100 mx-auto rounded p-5 mt-10 shadow-lg border-2 border-gray-200">
      {props.children}
    </div>
  )
}
