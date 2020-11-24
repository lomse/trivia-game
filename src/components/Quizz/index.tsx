import * as React from 'react'
import { Layout } from '../../elements/Layout'
import { useFetchQuizz } from '../../hooks'
import { Loader } from '../../elements/Loader'
import { useQuizz } from '../../hooks/index'
import { Questions } from './Questions'
import { QuizzSummary } from './QuizzSummary'
import { ModalElement } from '../../elements/Modal'
import { Confirm } from '../Modals/Confirm'
import { useConfirmAction, useToggleModal } from '../../hooks/common'

export const Quizz = () => {
  let { questions, isLoading, handleRestartQuizz, error } = useFetchQuizz()
  const { handleSelectAnswer, rightAnswers, questionNumber, wrongAnswers } = useQuizz(questions)
  const { modalState, handleConfirmAction } = useConfirmAction()
  const { isModalIsOpen, handleToggleModal } = useToggleModal(modalState)

  return (
    <Layout>
      {isLoading && (
        <div className="text-center h-full pt-56">
          <Loader
            strokeColor="#697a91"
            width={50}
            label="Loading questions..."
            labelClassName="text-center text-textSecondary"
          />
        </div>
      )}

      {!isLoading && error && <p className="text-center">An error occurred. Please try again.</p>}

      {!isLoading && !error && (
        <React.Fragment>
          <Questions
            handleSelectAnswer={handleSelectAnswer}
            questions={questions}
            questionNumber={questionNumber}
            handleToggleModal={handleToggleModal}
          />

          <QuizzSummary
            handleRestartQuizz={handleRestartQuizz}
            questions={questions}
            rightAnswers={rightAnswers}
            wrongAnswers={wrongAnswers}
            questionNumber={questionNumber}
          />

          <ModalElement
            modalIsOpen={isModalIsOpen}
            handleToggleModal={() => handleToggleModal()}
            content={<Confirm handleConfirmAction={handleConfirmAction} handleToggleModal={handleToggleModal} />}
          />
        </React.Fragment>
      )}
    </Layout>
  )
}
