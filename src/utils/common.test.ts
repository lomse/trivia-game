import { getRequestErrorMessage, isCorrectAnswer, hasMoreQuestions, getUserAnswer } from './common'
import { QuestionType, QuestionAlreadyPlayed } from '../types/index'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { GENERIC_API_ERROR } from './constants'

const axiosError = (validationErrorMessage: string, errorCode: number) => {
  const config: AxiosRequestConfig = {
    url: 'http://localhost',
    method: 'GET',
  }

  const axiosError: AxiosError = {
    name: 'some-name',
    message: validationErrorMessage,
    isAxiosError: true,
    config,
    toJSON: () => ({}),
    response: {
      data: { message: validationErrorMessage },
      status: errorCode,
      statusText: errorCode.toString(),
      headers: {},
      config,
    },
  }

  return axiosError
}

describe('Common Utils', () => {
  describe('isCorrectAnswer', () => {
    const question: QuestionType = {
      category: 'some-category',
      type: 'some-type',
      difficulty: 'hard',
      question: 'Some question goes here',
      correct_answer: 'True',
      incorrect_answers: ['False'],
    }

    test('returns true for "answer=True"', () => {
      const answer = 'True'

      expect(isCorrectAnswer(answer, question)).toBeTruthy()
    })

    test('returns false for "answer=False"', () => {
      const answer = 'False'

      expect(isCorrectAnswer(answer, question)).toBeFalsy()
    })
  })

  describe('getRequestErrorMessage', () => {
    const validationMessage = 'this is a validation error message'

    test('returns validation error message for statusCode="400"', () => {
      expect(getRequestErrorMessage(axiosError(validationMessage, 400))).toEqual(validationMessage)
    })

    test('returns validation error message for statusCode="401"', () => {
      expect(getRequestErrorMessage(axiosError(validationMessage, 401))).toEqual(validationMessage)
    })

    test('returns validation error message for statusCode="403"', () => {
      expect(getRequestErrorMessage(axiosError(validationMessage, 403))).toEqual(validationMessage)
    })

    test('returns validation error message for statusCode="404"', () => {
      expect(getRequestErrorMessage(axiosError(validationMessage, 404))).toEqual(validationMessage)
    })

    test('returns validation error message for statusCode="409"', () => {
      expect(getRequestErrorMessage(axiosError(validationMessage, 409))).toEqual(validationMessage)
    })

    test('returns validation error message for statusCode="422"', () => {
      expect(getRequestErrorMessage(axiosError(validationMessage, 422))).toEqual(validationMessage)
    })

    test('returns a generic error message for statusCode different than validation status code', () => {
      expect(getRequestErrorMessage(axiosError(validationMessage, 500))).toEqual(GENERIC_API_ERROR)
    })
  })

  describe('hasMoreQuestions', () => {
    const questions: QuestionType[] = [
      {
        category: 'History',
        type: 'boolean',
        difficulty: 'hard',
        question: 'Japan was part of the Allied Powers during World War I.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
      },
      {
        category: 'General Knowledge',
        type: 'boolean',
        difficulty: 'hard',
        question:
          '&quot;Number 16 Bus Shelter&quot; was a child&#039;s name that was approved by the New Zealand government.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
      },
    ]

    test('returns true when there are more questions', () => {
      const index = 0
      expect(hasMoreQuestions(index, questions)).toBeTruthy()
    })

    test('returns false when there are no more questions', () => {
      const index = 3
      expect(hasMoreQuestions(index, questions)).toBeFalsy()
    })
  })

  describe('getUserAnswer', () => {
    let answeredQuestion: QuestionAlreadyPlayed = {
      isCorrect: true,
      questionNumber: 0,
      selectedQuestion: {
        category: 'History',
        type: 'boolean',
        difficulty: 'hard',
        question: 'Japan was part of the Allied Powers during World War I.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
      },
    }

    test('should returns "Yes" when is correct', () => {
      expect(getUserAnswer(answeredQuestion)).toEqual('Yes')
    })

    test('should returns "No" when is incorrect', () => {
      answeredQuestion = {
        ...answeredQuestion,
        selectedQuestion: { ...answeredQuestion.selectedQuestion, correct_answer: 'False' },
      }
      expect(getUserAnswer(answeredQuestion)).toEqual('No')
    })
  })
})
