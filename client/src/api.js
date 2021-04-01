import Axios from 'axios'
import download from 'downloadjs'

const jsonResponseInterceptor = (response) => {
  const headers = response.headers

  if (!headers['content-type'].includes('application/json')) {
    return response
  }

  if (response) {
    if (response.status === 200) {
      return response.data
    } else if (response.status === 422) {
      window.location.href = '/'
    } else {
      return response
    }
  } else {
    throw new Error('Interal Error')
  }
}

const downloadResponseTransformer = (response, headers) => {
  if (!headers['content-type'].includes('application/csv')) {
    return response
  }
  download(response)
}

export const api = Axios.create(
  {
    baseURL: process.env.API_URL || '',
    responseType: 'json',
    withCredentials: true,
    transformResponse: [
      downloadResponseTransformer
    ]
  }
)

api.interceptors.response.use(jsonResponseInterceptor)

export const fetchContactRequests = () => {
  return api.get('/contact-request')
    .then(response => {
      return response.data
    })
}

export const createContactRequest = (contactRequest) => {
  return api.post('/contact-request', contactRequest).then(response => {
    return response.data
  })
}

export const downloadForm = (_id, fields) => {
  return api.post('/form/' + _id + '/fill', { fields }, { responseType: 'blob' })
}
