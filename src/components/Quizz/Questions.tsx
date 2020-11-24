import * as React from 'react'
import { AllHtmlEntities } from 'html-entities'
import { hasMoreQuestions, getGameProgress } from '../../utils/common'
import { DifficultyTag } from '../../elements/DifficultyTag'
import { Button } from '../../elements/Button'
import { QuestionType, CorrectAnswerType } from '../../types/index'
import { Link } from 'react-router-dom'

const entities = new AllHtmlEntities()

type QuestionsProps = {
  questions: QuestionType[]
  questionNumber: number
  handleToggleModal: () => void
  handleSelectAnswer: (selectedQuestion: QuestionType, answer: CorrectAnswerType) => void
}

export const Questions: React.FC<QuestionsProps> = ({
  questions,
  questionNumber,
  handleSelectAnswer,
  handleToggleModal,
}) => {
  return (
    <React.Fragment>
      {questions.length === 0 ? (
        <p className="No question available"></p>
      ) : (
        hasMoreQuestions(questionNumber, questions) && (
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-gray-700 text-center mt-5">
                {entities.decode(questions[questionNumber].category)}
              </h3>
              <div className="text-center mb-10">
                <span className="inline-block mr-2 text-sm text-gray-700">Difficulty: </span>
                <DifficultyTag
                  className="inline-block px-2 rounded text-xs text-white"
                  difficulty={questions[questionNumber].difficulty}>
                  {questions[questionNumber].difficulty}
                </DifficultyTag>
              </div>
            </div>

            <div className="flex-1">
              <div className="border border-gray-200 px-5 py-10 min-h-200 text-center text-3xl break-words rounded bg-white text-black mb-3">
                {entities.decode(questions[questionNumber].question)}
              </div>
              <div className="mb-10 text-center text-sm">{getGameProgress(questionNumber + 1, questions.length)}</div>
            </div>

            <div>
              <div className="flex items-center justify-center">
                <Button
                  type="info"
                  className="uppercase rounded font-semibold mr-5 px-10"
                  handleOnClick={() => handleSelectAnswer(questions[questionNumber], 'True')}>
                  YES
                </Button>
                <Button
                  type="danger"
                  className="uppercase rounded font-semibold px-10"
                  handleOnClick={() => handleSelectAnswer(questions[questionNumber], 'False')}>
                  NO
                </Button>
              </div>
              <div className="mt-5 text-center text-sm">
                <Link to="# " onClick={() => handleToggleModal()} className="text-red-600 underline">
                  Change difficulty
                </Link>
              </div>
            </div>
          </div>
        )
      )}
    </React.Fragment>
  )
}
