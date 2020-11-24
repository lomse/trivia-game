import { FetchQuizzesParams } from '../types'
import Http from '../utils/http.utils'
const BASE_API_URL = process.env.REACT_APP_API_BASE_URL

class QuizzApi {
  http: Http

  constructor(_http: Http | null = null) {
    if (_http) {
      this.http = _http
    } else {
      this.http = new Http()
    }
  }

  fetchQuizzes = (params: FetchQuizzesParams) =>
    this.http.get(`${BASE_API_URL}?${new URLSearchParams(params).toString()}`)
}

export default QuizzApi
