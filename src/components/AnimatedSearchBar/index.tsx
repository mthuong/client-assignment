import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Animated,
  MatrixTransform,
  NativeScrollEvent,
  PerpectiveTransform,
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

export const useAnimatedSearchBar = (): useAnimatedSearchBarType => {
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
        <TextInput style={styles.input} placeholder={t('home:Search')} />
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
      width: '100%',
    },
    searchBar: {
      marginHorizontal: theme.spacing[4],
      height: theme.spacing[6],
      borderRadius: theme.spacing[4],
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: theme.colors.inputField,
    },
    input: {
      ...theme.fonts.regular,
      fontSize: theme.fontSizes.sm,
      minWidth: '50%',
    },
  })
}
