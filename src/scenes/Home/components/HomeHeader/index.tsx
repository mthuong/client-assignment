import React, { Fragment, ReactNode, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'components/Text'
import { Theme, useTheme } from 'theme'

type HeaderProps = {
  leftIcon: ReactNode
  onPressLeft?: () => void

  title?: string

  subRightIcon?: ReactNode
  onPressSubRight?: () => void

  rightIcon?: ReactNode
  onPressRight?: () => void
}

export const HomeHeader = (props: HeaderProps) => {
  const {
    leftIcon,
    rightIcon,
    title,
    onPressLeft,
    onPressRight,
    subRightIcon,
    onPressSubRight,
  } = props
  const theme = useTheme()
  const styles = useStyles(theme)

  return (
    <View style={styles.header}>
      <View style={styles.fullWidthContainer}>
        <TouchableOpacity onPress={onPressLeft} style={styles.leftButton}>
          {leftIcon}
          <Text preset='header' style={[styles.titleText]}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>

      {!!subRightIcon && (
        <TouchableOpacity
          disabled={!rightIcon}
          onPress={onPressSubRight}
          style={styles.subRightButton}>
          {!!subRightIcon && subRightIcon}
        </TouchableOpacity>
      )}
      <TouchableOpacity
        disabled={!rightIcon}
        onPress={onPressRight}
        style={styles.rightButton}>
        {!!rightIcon && rightIcon}
      </TouchableOpacity>
    </View>
  )
}

const useStyles = ({ fonts, fontSizes, colors, spacing }: Theme) =>
  StyleSheet.create({
    fullWidthContainer: {
      flex: 1,
    },
    header: {
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.navigationBar,
      paddingHorizontal: spacing[4],
    },
    leftButton: {
      flexDirection: 'row',
    },
    rightButton: {
      width: spacing[6],
      alignItems: 'center',
    },
    subRightButton: {
      width: spacing[6],
      alignItems: 'center',
    },
    titleText: {
      ...fonts.bold,
      textAlign: 'left',
      fontSize: fontSizes.lg,
      color: colors.primaryText,
      paddingLeft: spacing[2],
    },
  })
