import { GenericResponse } from 'api'
import faker from 'faker'
import { Food, Restaurant } from 'models/restaurant'

export type GetRestaurantsNearYouDTO = {
  latitude: number
  longitude: number
  page: number
  limit?: number
}

export type GetRestaurantsNearYouResponse = {
  restaurants: Restaurant[]
} & GenericResponse

async function getRestaurantsNearYou({
  latitude,
  longitude,
  page,
  limit = 20,
}: GetRestaurantsNearYouDTO): Promise<GetRestaurantsNearYouResponse> {
  let index = 0
  const result: Restaurant[] = []
  const totalPage = 3

  while (index < limit) {
    // Random nearby coordinate
    const radius = Math.random() * 99 + 20 // range of [20, 100)
    const isMetric = Math.round(Math.random()) == 1

    const coordinate = faker.address.nearbyGPSCoordinate(
      [latitude, longitude],
      radius,
      isMetric
    )

    const url = `https://picsum.photos/seed/${radius}_${page}/320/240`
    const id = faker.datatype.uuid()
    const address = faker.address.streetAddress()
    const name = faker.commerce.productName()
    const rating = Math.random() * 5
    const numberOfRating = Math.random() * 1200 + 1

    const menu: Food[] = []

    const food1: Food = {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      url: `https://picsum.photos/seed/${radius}_${page}_food1/320/240`,
    }
    menu.push(food1)

    const food2: Food = {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      url: `https://picsum.photos/seed/${radius}_${page}_food2/320/240`,
    }
    menu.push(food2)

    result.push({
      id,
      url,
      location: { latitude: coordinate[0], longitude: coordinate[1] },
      address,
      name,
      rating,
      numberOfRating,
      menu,
    })

    index++
  }

  return {
    totalPage,
    page,
    restaurants: result,
  }
}

const restaurantService = {
  getRestaurantsNearYou,
}

export default restaurantService
