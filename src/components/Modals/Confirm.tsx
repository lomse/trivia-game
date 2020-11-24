import * as React from 'react'
import { Button } from '../../elements/Button'

type ConfirmProps = {
  handleConfirmAction: (choice: boolean) => void
  handleToggleModal: () => void
}

export const Confirm: React.FC<ConfirmProps> = ({ handleToggleModal, handleConfirmAction }) => {
  return (
    <div className="w-72 p-5 text-sm text-center">
      <h3 className="text-lg font-semibold mb-5">Confirm!</h3>
      <p className="text-gray-700 mb-1">You will lose your current score.</p>
      <p className="text-gray-700">Are you sure you want to leave the game?</p>

      <div className="flex justify-center items-center mt-5">
        <Button type="danger" handleOnClick={() => handleConfirmAction(true)} className="mr-2 rounded">
          Leave
        </Button>
        <Button type="info" handleOnClick={() => handleToggleModal()} className="ml-2 rounded">
          Continue
        </Button>
      </div>
    </div>
  )
}
