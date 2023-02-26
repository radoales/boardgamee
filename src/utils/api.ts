import { REST_API_URL } from '@env'
import Axios from 'axios'

export const restApiRequest = async <T>({
  url,
  method = 'GET',
  data
}: RequestOptions<T>): Promise<T> => {
  const response = await Axios.request<T>({
    method,
    headers: {
      'x-hasura-admin-secret':
        'Q7UMxGqvSQPyiZ74h46vc0xLm0xzBTYRqm6MTCeYDdR3deersdFZ8eD6gR6PdWrR'
    },
    url: `${REST_API_URL}/${url}`,
    data
  })
  return response.data
}

export function getStrapiURL(path: string) {
  return `${REST_API_URL}${path}`
}

// interface ApiResponse<T> {
//   data: T
// }

interface RequestOptions<T> {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: T
}
