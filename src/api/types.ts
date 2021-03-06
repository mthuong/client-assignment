export type ISignUp = {
  email: string
  password: string
  confirmPassword: string
  name: string
}

export type ISignIn = {
  email?: string
  password?: string
}

export type GenericResponse = {
  totalPage: number
  page: number
}
