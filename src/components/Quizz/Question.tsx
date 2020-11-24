import * as React from 'react'
import { AllHtmlEntities } from 'html-entities'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { QuestionAlreadyPlayed } from '../../types'
import { getUserAnswer } from '../../utils/common'

type QuestionProps = {
  question: QuestionAlreadyPlayed
}

const entities = new AllHtmlEntities()

export const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className="p-2 border-b-8 border-gray-200 flex items-start">
      <div className="mr-3">
        {question.isCorrect ? (
          <AiFillCheckCircle color="green" size="30" />
        ) : (
          <AiFillCloseCircle color="red" size="30" />
        )}
      </div>
      <div className={`${!question.isCorrect ? 'text-red-600' : ''}`}>
        <h3 className="font-semibold">{entities.decode(question.selectedQuestion.category)}</h3>
        <p className="font-normal">{entities.decode(question.selectedQuestion.question)}</p>
        <p className="text-blue-600 text-sm mt-2 font-semibold">Your answer was: {getUserAnswer(question)}</p>
      </div>
    </div>
  )
}
