import React from 'react'
import {
  Animated,
  MatrixTransform,
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
  Text,
  TextInput,
  TranslateXTransform,
  TranslateYTransform,
  View,
} from 'react-native'

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
        <TextInput />
      </View>
    </Animated.View>
  )
}

export default AnimatedSearchBar

const styles = StyleSheet.create({
  header: {
    zIndex: 100,
    paddingBottom: 10,
  },
  searchBar: {
    marginHorizontal: '5%',
    width: '90%',
    marginTop: 40,
    height: 40,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
