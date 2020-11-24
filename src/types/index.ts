export type QuizzDifficulty = 'easy' | 'medium' | 'hard'
export type CorrectAnswerType = 'True' | 'False'

export type QuestionType = {
  category: string
  type: string
  difficulty: QuizzDifficulty
  question: string
  correct_answer: CorrectAnswerType
  incorrect_answers: string[]
}

export type FetchQuizzesParams = {
  amount: string
  difficulty: string
  type: string
}

export type IconProps = {
  width?: number
  height?: number
  fillColor?: string
  strokeColor?: string
  className?: string
}

export type QuizzRightAnswerType = {
  questionNumber: number
  selectedQuestion: QuestionType
}

export enum LOAD_STATES {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  FAILED = 'FAILED',
}

export type QuestionAlreadyPlayed = {
  isCorrect: boolean
  questionNumber: number
  selectedQuestion: QuestionType
}
