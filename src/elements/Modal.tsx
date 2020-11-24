import * as React from 'react'
import Modal from 'react-modal'
import { modalStyles } from '../utils/common'

type ModalElementProps = {
  modalIsOpen: boolean
  content: JSX.Element
  handleToggleModal: () => void
}

export const ModalElement: React.FC<ModalElementProps> = (props) => {
  const { modalIsOpen, content, handleToggleModal } = props

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => handleToggleModal()}
      style={modalStyles}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
      ariaHideApp={false}>
      {content}{' '}
    </Modal>
  )
}
