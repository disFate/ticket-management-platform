export interface CurrentUser {
  userId: string
  firstName: string
  lastName: string
  avatar?: string
  email: string
  scopes: string[]
}
