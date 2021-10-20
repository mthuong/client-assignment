export interface Restaurant {
  id: string
  url: string
  name: string
  address: string
  rating: number
  numberOfRating: number
  location: Location

  menu: Food[]
}

export type Location = {
  latitude: string
  longitude: string
}

export type Food = {
  id: string
  name: string
  price: string
  url: string
}
