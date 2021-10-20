/**
 * Navigator
 */
import * as React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import Config from 'react-native-config'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SignInParams } from 'scenes/Authentication/SignIn'
import { SignUpParams } from 'scenes/Authentication/SignUp'
import SplashScreen from 'scenes/Authentication/SplashScreen'
import { StoryBook } from 'scenes/storybook'

import { DetailsScreen, DetailsScreenParams } from '../scenes/Details'
import { HomeScreen, HomeScreenParams } from '../scenes/Home'

import { navigationRef, navigationState } from './RootNavigation'
import { NAV_SCREENS } from './RouteNames'

export type RootStackParamList = {
  [NAV_SCREENS.Splash]: undefined

  [NAV_SCREENS.Home]: HomeScreenParams
  [NAV_SCREENS.Details]: DetailsScreenParams

  [NAV_SCREENS.SignIn]: SignInParams
  [NAV_SCREENS.SignUp]: SignUpParams
}

// Update the param types when you have more screen params
export type RootStackParamTypes =
  | SignInParams
  | SignInParams
  | HomeScreenParams
  | DetailsScreenParams

export const MainStack = createStackNavigator<RootStackParamList>()

type NavigationProps = ReturnType<typeof mapStateToProps>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Navigator(props: NavigationProps) {
  const isStoryBook = Config.ENVIRONMENT === 'storybook'
  const [isLoading, setIsLoading] = useState(true)

  React.useEffect(() => {
    setIsLoading(false)
  }, [])

  const { t } = useTranslation()

  if (isStoryBook) {
    return (
      <SafeAreaView style={styles.container}>
        <StoryBook />
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            navigationState.isReady = true
          }}>
          <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <>
              <MainStack.Screen
                name={NAV_SCREENS.Home}
                component={HomeScreen}
                options={{ title: t('Home') }}
              />
              <MainStack.Screen
                name={NAV_SCREENS.Details}
                component={DetailsScreen}
                options={{ title: 'My details' }}
              />
            </>
          </MainStack.Navigator>
        </NavigationContainer>
      )}
    </View>
  )
}

const mapStateToProps = () => ({
})

export default connect(mapStateToProps)(Navigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
