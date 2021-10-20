import { TUser } from 'models'
import { Restaurant } from 'models/restaurant'

export type ReduxState = {
  auth: AuthState
}

export type AuthState = {
  isLoading: boolean
  isSignOut: boolean
  user: TUser | null | undefined
  error: string | null | undefined
}

export type RestaurantsState = {
  restaurants: Restaurant[]
  isLoading: boolean
  error?: Error
  page: number
  totalPage: number
}
