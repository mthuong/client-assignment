import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native'
import Geolocation, { GeoPosition } from 'react-native-geolocation-service'

export interface UseLocationProps {
  highAccuracy?: boolean
  forceLocation?: boolean
  useLocationManager?: boolean
  locationDialog?: boolean
}

const useLocation = ({
  highAccuracy = false,
  forceLocation = true,
  useLocationManager = false,
  locationDialog = true,
}: UseLocationProps) => {
  const [location, setLocation] = useState<GeoPosition | undefined>(undefined)
  const { t } = useTranslation()

  const hasPermissionIOS = useCallback(async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert(t('home:UnableOpenSettings'))
      })
    }
    const status = await Geolocation.requestAuthorization('whenInUse')

    if (status === 'granted') {
      return true
    }

    if (status === 'denied') {
      Alert.alert(t('home:LocationPermissionDenied'))
    }

    if (status === 'disabled') {
      Alert.alert(t('home:TurnOnLocationPermission'), '', [
        { text: t('home:GoToSettings'), onPress: openSetting },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        { text: t('home:DontUseLocation'), onPress: () => {} },
      ])
    }

    return false
  }, [t])

  const hasLocationPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS()
      return hasPermission
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )

    if (hasPermission) {
      return true
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        t('home:LocationPermissionDeniedByUser'),
        ToastAndroid.LONG
      )
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        t('home:LocationPermissionDeniedByUser'),
        ToastAndroid.LONG
      )
    }

    return false
  }, [hasPermissionIOS, t])

  const getLocation = useCallback(async () => {
    const hasPermission = await hasLocationPermission()

    if (!hasPermission) {
      return
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position)
        console.log(position)
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message)
        setLocation(undefined)
        // console.log(error)
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      }
    )
  }, [
    forceLocation,
    hasLocationPermission,
    highAccuracy,
    locationDialog,
    useLocationManager,
  ])

  useEffect(() => {
    getLocation()
  }, [getLocation])

  return [location]
}

export default useLocation
