import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Image } from 'components/image'
import { Separator } from 'components/separator'
import { Text } from 'components/Text'
import { Theme, useTheme } from 'theme'

export interface IRestaurantRowProps {
  url: string
}

export default function RestaurantRow({ url }: IRestaurantRowProps) {
  const styles = useStyles(useTheme())

  console.log(url)

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} url={url} />
        <View style={styles.info}>
          <Text>asdasdas asdas dajshdn aksjn da</Text>
          <Text>123 456 789</Text>
        </View>
      </View>
      <Separator />
    </View>
  )
}

const useStyles = ({ spacing }: Theme) =>
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
  })
