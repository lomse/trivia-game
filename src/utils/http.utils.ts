import axios from 'axios'

class Http {
  get = (url: string, query: object = {}) => axios.get(url, { params: query })

  post = (url: string, data: object) => axios.post(url, data)

  update = (url: string, data: object = {}) => axios.put(url, data)

  delete = (url: string) => axios.delete(url)
}

export default Http
