import { AxiosError } from 'axios'
import { CorrectAnswerType, QuestionAlreadyPlayed, QuizzRightAnswerType } from '../types'
import { QuestionType } from '../types/index'
import { GENERIC_API_ERROR, VALIDATION_ERROR_CODES } from './constants'

export const isCorrectAnswer = (answer: CorrectAnswerType, question: QuestionType) => {
  return answer === question.correct_answer
}

export const getRequestErrorMessage = (error: AxiosError) => {
  let requestErrorMessage = GENERIC_API_ERROR
  const isValidationError = (error: AxiosError) =>
    error.response && VALIDATION_ERROR_CODES.includes(error.response.status)

  if (isValidationError(error)) {
    requestErrorMessage = error.response?.data?.Message || error.response?.data?.message
  }

  return requestErrorMessage
}

export const hasMoreQuestions = (lastIndex: number, question: QuestionType[]) => {
  return lastIndex <= question.length - 1
}

export const getGameProgress = (current: number, total: number) => `${current} of ${total}`

export const getScore = (rightAnswers: QuizzRightAnswerType[], allQuestion: QuestionType[]) => ({
  right: rightAnswers.length,
  overAll: allQuestion.length,
})

export const isAwesomeScore = (totalRightAnswers: number) => totalRightAnswers >= 7

export const getScorePercentage = (score: number, overall: number) => {
  return ((score / overall) * 100).toFixed(0)
}

export const getScoreSummary = (
  wrongAnswers: QuizzRightAnswerType[],
  rightAnswers: QuizzRightAnswerType[]
): QuestionAlreadyPlayed[] => {
  return [
    ...wrongAnswers.map((answer) => ({ ...answer, isCorrect: false })),
    ...rightAnswers.map((answer) => ({ ...answer, isCorrect: true })),
  ].sort(() => Math.random() - 0.5)
}

export const getUserAnswer = (answeredQuestion: QuestionAlreadyPlayed) => {
  if (answeredQuestion.isCorrect) {
    return answeredQuestion.selectedQuestion.correct_answer === 'True' ? 'Yes' : 'No'
  }

  return answeredQuestion.selectedQuestion.correct_answer === 'True' ? 'No' : 'Yes'
}

export const modalStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '5px',
    border: 0,
    padding: 0,
    boxShadow: 'rgb(39 39 39 / 18%) 0px 4px 8px 0px, rgba(0, 0, 0, 0.08) 0px 2px 4px 0px',
  },
  overlay: {
    backgroundColor: `rgba(0, 0, 0, 0.81)`,
  },
}
