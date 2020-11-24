import { AxiosResponse } from 'axios'
import { FetchQuizzesParams } from '../types'
import Http from '../utils/http.utils'
import QuizzApi from './Quizz'

jest.mock('../utils/http.utils')

const mockGet = jest.fn()
Http.prototype.get = mockGet
const quizzApi = new QuizzApi(new Http())

describe('QuizzApi', () => {
  beforeEach(() => {
    mockGet.mockReset()
  })

  describe('fetchQuizzes', () => {
    const params: FetchQuizzesParams = {
      amount: '2',
      difficulty: 'hard',
      type: 'boolean',
    }

    const expectedResult = {
      data: [
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
      ],
    }

    test('calls get function', () => {
      quizzApi.fetchQuizzes(params)
      expect(mockGet).toHaveBeenCalledTimes(1)
    })

    test('returns an array or projects', async () => {
      mockGet.mockResolvedValue(expectedResult)

      return quizzApi.fetchQuizzes(params).then((data: AxiosResponse<Response>) => expect(data).toEqual(expectedResult))
    })
  })
})
