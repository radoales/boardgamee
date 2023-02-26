import { AuthUser } from '../models/user'

export interface User extends AuthUser {
  username: string
  name?: string
  external_id: string
}
