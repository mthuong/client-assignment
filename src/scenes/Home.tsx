import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AnimatedSearchBar from 'components/AnimatedSearchBar'

// type HomeScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   NAV_SCREENS.Home
// >
// type HomeScreenRoute = RouteProp<RootStackParamList, NAV_SCREENS.Home>

// type Props = {
//   navigation: HomeScreenNavigationProp
//   route: HomeScreenRoute
// }

const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

export function HomeScreen() {
  const { t } = useTranslation()
  const scrollY = React.useRef(new Animated.Value(0)).current
  const diffClamp = Animated.diffClamp(scrollY, 0, 100)

  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -60],
    extrapolate: 'clamp',
  })

  const marginTop = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -60],
    extrapolate: 'clamp',
  })

  // const paddingTop = diffClamp.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [10, 110],
  //   extrapolate: 'clamp',
  // })

  const opacity = diffClamp.interpolate({
    inputRange: [0, 80, 100],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  })

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View key={item} style={styles.card}>
        <Text>{`Card ${item}`}</Text>
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AnimatedSearchBar transform={[{ translateY }]} opacity={opacity} />
        <Animated.View style={[styles.innerContainer, { marginTop }]}>
          <FlatList
            contentContainerStyle={{ marginTop: 10 }}
            refreshControl={
              <RefreshControl
                // tintColor='#fff'
                onRefresh={() => {
                  console.warn('Refreshing')
                }}
                refreshing={false}
              />
            }
            data={data}
            keyExtractor={item => item}
            scrollEventThrottle={16}
            renderItem={renderItem}
            onScroll={e => {
              if (e.nativeEvent.contentOffset.y > 0)
                if (
                  e.nativeEvent.contentOffset.y <
                  (e.nativeEvent.contentSize.height -
                    e.nativeEvent.layoutMeasurement.height) *
                    0.8
                ) {
                  scrollY.setValue(e.nativeEvent.contentOffset.y)
                }
            }}
          />
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export type HomeScreenParams = undefined

const styles = StyleSheet.create({
  container: { flex: 1 },

  innerContainer: {
    flex: 1,
    height: '100%',
  },

  card: {
    width: '90%',
    marginLeft: '5%',
    height: 100,
    borderRadius: 10,
    backgroundColor: 'yellow',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
