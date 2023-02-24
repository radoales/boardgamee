import { REST_API_URL } from '@env'
import Axios from 'axios'

export const restApiRequest = async <T>({
  url
}: RequestOptions): Promise<T> => {
  const response = await Axios.request<ApiResponse<T>>({
    method: 'GET',
    headers: {
      'x-hasura-admin-secret':
        'Q7UMxGqvSQPyiZ74h46vc0xLm0xzBTYRqm6MTCeYDdR3deersdFZ8eD6gR6PdWrR'
    },
    url: `${REST_API_URL}/${url}`
  })
  return response.data.data
}

export function getStrapiURL(path: string) {
  return `${REST_API_URL}${path}`
}

interface ApiResponse<T> {
  data: T
}

interface RequestOptions {
  url: string
}
