import * as React from 'react'
import { BsChevronDown } from 'react-icons/bs'

type SelectElementProps = {
  value: string
  options: Array<{ label: string; value: string }>
  handleOnChange: (value: string) => void
}

const dropDownStyles = {
  right: 8,
  top: 16,
}

export const SelectElement: React.FC<SelectElementProps> = ({ value, options, handleOnChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}
        className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded">
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div
        className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
        style={dropDownStyles}>
        <BsChevronDown />
      </div>
    </div>
  )
}
