import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export const useToggleModal = (initialModalState?: boolean) => {
  const [isModalIsOpen, setToggleModal] = useState(initialModalState || false)

  const handleToggleModal = () => {
    setToggleModal(!isModalIsOpen)
  }

  return {
    isModalIsOpen,
    handleToggleModal,
  }
}

export const useConfirmAction = () => {
  const history = useHistory()

  const handleConfirmAction = (choice: boolean) => {
    if (choice) {
      history.push('/')
    }
  }

  return {
    modalState: false,
    handleConfirmAction,
  }
}
