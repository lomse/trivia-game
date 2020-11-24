import { useState, useEffect } from 'react'
import { CorrectAnswerType, LOAD_STATES, QuestionType, QuizzRightAnswerType } from '../types'
import QuizzApi from '../apis/Quizz'
import { getRequestErrorMessage, isCorrectAnswer } from '../utils/common'
import { useLocation } from 'react-router-dom'

const quizzApi = new QuizzApi()

export const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

export const useFetchQuizz = () => {
  const query = useQuery()
  const difficulty = query.get('difficulty') || 'hard'

  const [error, setError] = useState('')
  const [loadState, setLoadState] = useState<LOAD_STATES | string>('')
  const [questions, setQuestions] = useState<QuestionType[]>([])

  const fetchQuizz = async (difficulty: string) => {
    setLoadState(LOAD_STATES.LOADING)
    try {
      const response = await quizzApi.fetchQuizzes({ amount: '10', difficulty, type: 'boolean' })
      const questions: QuestionType[] = response.data.results
      setQuestions(questions)
      setLoadState(LOAD_STATES.LOADED)
    } catch (err) {
      setLoadState(LOAD_STATES.FAILED)
      const errorMessage = getRequestErrorMessage(err)
      setError(errorMessage)
    }
  }

  const handleRestartQuizz = () => {
    setError('')
    setLoadState('')
    setQuestions([])
    fetchQuizz(difficulty)
  }

  useEffect(() => {
    fetchQuizz(difficulty)
  }, [difficulty])

  return {
    questions,
    error,
    handleRestartQuizz,
    isLoading: loadState === LOAD_STATES.LOADING,
  }
}

export const useQuizz = (questions: QuestionType[]) => {
  const [questionNumber, setQuestionNumber] = useState(0)
  const [rightAnswers, setRightAnswers] = useState<QuizzRightAnswerType[]>([])
  const [wrongAnswers, setWrongAnswers] = useState<QuizzRightAnswerType[]>([])

  const handleSelectAnswer = (selectedQuestion: QuestionType, answer: CorrectAnswerType) => {
    const questionNumber = questions.findIndex(
      (question) => question.category === selectedQuestion.category && question.question === selectedQuestion.question
    )

    if (isCorrectAnswer(answer, selectedQuestion)) {
      setRightAnswers([
        ...rightAnswers,
        {
          questionNumber,
          selectedQuestion,
        },
      ])
    } else {
      setWrongAnswers([
        ...wrongAnswers,
        {
          questionNumber,
          selectedQuestion,
        },
      ])
    }

    setQuestionNumber(questionNumber + 1)
  }

  useEffect(() => {
    if (questions.length === 0) {
      setQuestionNumber(0)
      setRightAnswers([])
      setWrongAnswers([])
    }
  }, [questions])

  return {
    handleSelectAnswer,
    rightAnswers,
    questionNumber,
    wrongAnswers,
  }
}
