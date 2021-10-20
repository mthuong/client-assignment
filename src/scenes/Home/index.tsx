import React, { useCallback, useEffect } from 'react'
import { Animated, FlatList, RefreshControl, StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AnimatedSearchBar, {
  useAnimatedSearchBar,
} from 'components/AnimatedSearchBar'
import { Separator } from 'components/separator'
import { Restaurant } from 'models/restaurant'
import { HomeHeader } from 'scenes/Home/components/HomeHeader'
import { useAppDispatch, useAppSelector } from 'stores/hook'
import { restaurantAsyncActions } from 'stores/restaurantReducer'
import restaurantSelectors from 'stores/restaurantSelectors'
import { Theme, useTheme } from 'theme'
import { IconInbox, IconLocationFilled, IconMenu } from 'theme/svg'

import RestaurantRow from './components/RestaurantRow'

// type HomeScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   NAV_SCREENS.Home
// >
// type HomeScreenRoute = RouteProp<RootStackParamList, NAV_SCREENS.Home>

// type Props = {
//   navigation: HomeScreenNavigationProp
//   route: HomeScreenRoute
// }

export function HomeScreen() {
  const styles = useStyles(useTheme())
  const [translateY, marginTop, opacity, setScrollY] = useAnimatedSearchBar()
  const restaurants = useAppSelector(restaurantSelectors.getRestaurantsNearBy)
  const page = useAppSelector(restaurantSelectors.getRestaurantPage)
  const dispatch = useAppDispatch()

  const getData = useCallback(() => {
    console.log('getRestaurantsNearYou')
    dispatch(
      restaurantAsyncActions.getRestaurantsNearYou({
        latitude: 10.8621592,
        longitude: 106.7588497,
        page: page + 1,
      })
    )
  }, [dispatch, page])

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderItem = ({ item }: { item: Restaurant }) => {
    return <RestaurantRow key={item.id} url={item.url} />
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <HomeHeader
          leftIcon={<IconLocationFilled />}
          title='Current Location'
          subRightIcon={<IconInbox />}
          rightIcon={<IconMenu />}
        />
        <AnimatedSearchBar transform={[{ translateY }]} opacity={opacity} />
        <Animated.View style={[styles.innerContainer, { marginTop }]}>
          <Separator />
          <FlatList<Restaurant>
            contentContainerStyle={styles.flatList}
            refreshControl={
              <RefreshControl
                onRefresh={() => {
                  console.warn('Refreshing')
                }}
                refreshing={false}
              />
            }
            data={restaurants}
            keyExtractor={item => item.id}
            scrollEventThrottle={16}
            renderItem={renderItem}
            onScroll={e => {
              setScrollY(e.nativeEvent)
            }}
          />
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export type HomeScreenParams = undefined

const useStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.backgroundColor },

    innerContainer: {
      flex: 1,
      height: '100%',
    },

    flatList: {},
  })
}
