import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { GeoCoordinates } from 'react-native-geolocation-service'
import { Image } from 'components/image'
import { Separator } from 'components/separator'
import { Text } from 'components/Text'
import { Food } from 'models/restaurant'
import { Theme, useTheme } from 'theme'
import { IconPartnerBadge, IconStar } from 'theme/svg'

import useRating from './hook/useRating'

export interface IRestaurantRowProps {
  url: string
  name: string
  address: string
  menu: Food[]
  rating: number
  numberOfRating: number
  location?: GeoCoordinates
}

export default function RestaurantRow({
  url,
  name,
  address,
  rating,
  menu,
  numberOfRating,
  location,
}: IRestaurantRowProps) {
  const styles = useStyles(useTheme())

  const menuTitle = menu
    .map(item => {
      return item.name
    })
    .filter((value, index) => {
      return index < 2
    })
    .join(' - ')

  const [formattedRating, formattedNumberOfRating] = useRating(
    rating,
    numberOfRating
  )

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} url={url} />
        <View style={styles.info}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              <View style={styles.icon}>
                <IconPartnerBadge />
              </View>{' '}
              {name} - {address}
            </Text>

            <Text style={styles.menu}>{menuTitle}</Text>
          </View>

          <View style={styles.rating}>
            <Text style={styles.ratingTitle}>
              <View style={styles.icon}>
                <IconStar />
              </View>{' '}
              {formattedRating}
              <Text style={styles.numberOfRating}>
                {` ${formattedNumberOfRating}`}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <Separator />
    </View>
  )
}

const useStyles = ({ spacing, fonts, fontSizes, colors }: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    innerContainer: {
      flexDirection: 'row',
      paddingVertical: spacing[3],
      marginHorizontal: spacing[4],
    },
    image: {
      width: 88,
      height: 88,
      borderRadius: spacing[2],
    },
    info: {
      flex: 1,
      marginLeft: spacing[3],
      flexDirection: 'column',
    },
    icon: {
      justifyContent: 'center',
    },
    title: {
      ...fonts.regular,
      fontSize: fontSizes.md,
      color: colors.primaryText,
      alignItems: 'center',
      justifyContent: 'center',
    },
    menu: {
      ...fonts.regular,
      fontSize: fontSizes.sm,
      color: colors.secondaryText,
    },
    titleContainer: {
      flex: 1,
    },
    rating: {
      position: 'relative',
      bottom: 0,
    },
    ratingTitle: {
      ...fonts.regular,
      fontSize: fontSizes.sm,
      color: colors.primaryText,
    },
    numberOfRating: {
      ...fonts.regular,
      fontSize: fontSizes.sm,
      color: colors.secondaryText,
    },
  })
