import { RootState } from './store'

const getRestaurantsNearBy = (state: RootState) => state.restaurant.restaurants
const getRestaurantPage = (state: RootState) => state.restaurant.page
const isEndRestaurantPage = (state: RootState) =>
  state.restaurant.page == state.restaurant.totalPage

const restaurantSelectors = {
  getRestaurantsNearBy,
  getRestaurantPage,
  isEndRestaurantPage,
}

export default restaurantSelectors
