import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Animated,
  MatrixTransform,
  NativeScrollEvent,
  PerpectiveTransform,
  Platform,
  RotateTransform,
  RotateXTransform,
  RotateYTransform,
  RotateZTransform,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  SkewXTransform,
  SkewYTransform,
  StyleSheet,
  TextInput,
  TranslateXTransform,
  TranslateYTransform,
  View,
} from 'react-native'
import { Theme, useTheme } from 'theme'
import { IconSearch } from 'theme/svg'

type useAnimatedSearchBarType = [
  Animated.AnimatedInterpolation,
  Animated.AnimatedInterpolation,
  Animated.AnimatedInterpolation,
  (nativeEvent: NativeScrollEvent) => void
]

export const useAnimatedSearchBar = (y = 0): useAnimatedSearchBarType => {
  const scrollY = React.useRef(new Animated.Value(y)).current
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

  const opacity = diffClamp.interpolate({
    inputRange: [0, 80, 100],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  })

  const setScrollY = useCallback(
    (nativeEvent: NativeScrollEvent) => {
      if (nativeEvent.contentOffset.y > 0)
        if (
          nativeEvent.contentOffset.y <
          (nativeEvent.contentSize.height -
            nativeEvent.layoutMeasurement.height) *
            0.8
        ) {
          scrollY.setValue(nativeEvent.contentOffset.y)
        }
    },
    [scrollY]
  )

  return [translateY, marginTop, opacity, setScrollY]
}

type AnimatedHeaderProps = {
  transform?: Animated.WithAnimatedArray<
    | PerpectiveTransform
    | RotateTransform
    | RotateXTransform
    | RotateYTransform
    | RotateZTransform
    | ScaleTransform
    | ScaleXTransform
    | ScaleYTransform
    | TranslateXTransform
    | TranslateYTransform
    | SkewXTransform
    | SkewYTransform
    | MatrixTransform
  >
  opacity?: number | Animated.Value | Animated.AnimatedInterpolation | undefined
}

const AnimatedSearchBar = ({ transform, opacity }: AnimatedHeaderProps) => {
  const { t } = useTranslation()
  const styles = useStyles(useTheme())
  return (
    <Animated.View
      style={[
        styles.header,
        {
          transform,
          opacity,
        },
      ]}>
      <View style={[styles.searchBar]}>
        <IconSearch />
        <TextInput
          style={styles.input}
          placeholder={t('home:Search')}
          clearButtonMode='unless-editing'
        />
      </View>
    </Animated.View>
  )
}

export default AnimatedSearchBar

const useStyles = (theme: Theme) => {
  return StyleSheet.create({
    header: {
      zIndex: 100,
      paddingVertical: theme.spacing[2],
      paddingHorizontal: theme.spacing[4],
      width: '100%',
    },
    searchBar: {
      paddingHorizontal: theme.spacing[5],
      height: Platform.select({
        ios: theme.spacing[6],
        android: theme.spacing[7],
      }),
      borderRadius: theme.spacing[4],
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: theme.colors.inputField,
    },
    input: {
      ...theme.fonts.regular,
      fontSize: theme.fontSizes.md,
      minWidth: '50%',
    },
  })
}
