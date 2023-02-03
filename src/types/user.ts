import { AuthUser } from '../models/user'

export interface User extends AuthUser {
  username: string
}
