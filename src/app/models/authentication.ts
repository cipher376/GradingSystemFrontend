import { OperationState } from "."

export class Authentication {
  id?: number
  email?: string
  retryCount?: number
  state?: OperationState
  lastLoggedIn?: Date
  token?: string
  data?: string
  clientIP?: string
  clientDevice?: string
  provider: any

}
