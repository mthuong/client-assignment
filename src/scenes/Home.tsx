import React from 'react'
import {
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AnimatedSearchBar, {
  useAnimatedSearchBar,
} from 'components/AnimatedSearchBar'
import { Separator } from 'components/separator'
import { Theme, useTheme } from 'theme'

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
  const styles = useStyles(useTheme())

  const [translateY, marginTop, opacity, setScrollY] = useAnimatedSearchBar()

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
          <Separator />
          <FlatList
            contentContainerStyle={{ marginTop: 10 }}
            refreshControl={
              <RefreshControl
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

    card: {
      width: '90%',
      marginLeft: '5%',
      height: 100,
      borderRadius: theme.spacing[3],
      marginBottom: theme.spacing[4],
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}
