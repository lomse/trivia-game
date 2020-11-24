import * as React from 'react'
import Confetti from 'react-confetti'
import { getScore, hasMoreQuestions, getScoreSummary, getScorePercentage, isAwesomeScore } from '../../utils/common'
import { QuizzRightAnswerType, QuestionType, QuestionAlreadyPlayed } from '../../types/index'
import { Button } from '../../elements/Button'
import { Question } from './Question'

type QuizzSummaryProps = {
  questionNumber: number
  handleRestartQuizz: () => void
  questions: QuestionType[]
  rightAnswers: QuizzRightAnswerType[]
  wrongAnswers: QuizzRightAnswerType[]
}

export const QuizzSummary: React.FC<QuizzSummaryProps> = (props) => {
  let quizzSummary: QuestionAlreadyPlayed[] = []
  const { questions, rightAnswers, wrongAnswers, questionNumber, handleRestartQuizz } = props
  const totalRightAnswers = getScore(rightAnswers, questions).right
  const totalQuestions = getScore(rightAnswers, questions).overAll
  const overallScore = `${totalRightAnswers} / ${totalQuestions}`

  if (!hasMoreQuestions(questionNumber, questions)) {
    quizzSummary = getScoreSummary(wrongAnswers, rightAnswers)
  }

  return (
    <React.Fragment>
      {!hasMoreQuestions(questionNumber, questions) && (
        <React.Fragment>
          <h3 className="text-2xl font-bold text-gray-700 text-center mt-0 mb-3 pb-5 border-b-2 border-gray-200">
            You Scored {overallScore} <br /> {`${getScorePercentage(totalRightAnswers, totalQuestions)}%`}
          </h3>

          <div className="overflow-y-auto h-500">
            {quizzSummary.map((question, index) => (
              <Question key={index} question={question} />
            ))}
          </div>
          <div className="text-center mt-5">
            <Button
              type="info"
              handleOnClick={() => handleRestartQuizz()}
              className="uppercase rounded font-semibold px-10">
              Play Again?
            </Button>
          </div>

          {isAwesomeScore(totalRightAnswers) && <Confetti />}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
