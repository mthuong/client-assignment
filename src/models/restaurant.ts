import { GeoCoordinates } from 'react-native-geolocation-service'

export interface Restaurant {
  id: string
  url: string
  name: string
  address: string
  rating: number
  numberOfRating: number
  location?: GeoCoordinates

  menu: Food[]
}

export type Food = {
  id: string
  name: string
  price: string
  url: string
}
