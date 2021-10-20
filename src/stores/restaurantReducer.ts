import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import restaurantService, {
  GetRestaurantsNearYouDTO,
  GetRestaurantsNearYouResponse,
} from 'api/RestaurantService'
import { isError } from 'common/func'

import { snackbarSlice } from './snackbarReducer'
import { RestaurantsState } from './types'

const initialState: RestaurantsState = {
  isLoading: false,
  restaurants: [],
  error: undefined,
  page: 1,
  totalPage: 0,
}

const getRestaurantsNearYou = createAsyncThunk(
  'restaurants/nearby',
  async (request: GetRestaurantsNearYouDTO, { rejectWithValue, dispatch }) => {
    try {
      const response = await restaurantService.getRestaurantsNearYou(request)

      return response
    } catch (error) {
      if (isError(error)) {
        dispatch(snackbarSlice.actions.show(error.message))

        return rejectWithValue(error)
      }
    }
  }
)

export const restaurantSlice = createSlice({
  name: 'restaurantSlice',
  initialState,
  reducers: {
    finishLoading: state => {
      state.isLoading = false
    },
  },
  extraReducers: {
    [getRestaurantsNearYou.fulfilled.type]: (
      state,
      action: PayloadAction<GetRestaurantsNearYouResponse>
    ) => {
      const { restaurants, totalPage, page } = action.payload
      if (page == 1) {
        state.restaurants = restaurants
      } else {
        state.restaurants.push(...restaurants)
      }

      state.isLoading = false
      state.page = page
      state.totalPage = totalPage
    },
    [getRestaurantsNearYou.rejected.type]: (
      state,
      action: PayloadAction<Error>
    ) => {
      state.restaurants = []
      state.isLoading = false
      state.error = action.payload
    },
  },
})

const restaurantReducer = restaurantSlice.reducer
export default restaurantReducer

export const restaurantAsyncActions = { getRestaurantsNearYou }
