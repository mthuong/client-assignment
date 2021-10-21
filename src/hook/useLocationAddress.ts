import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GeoCoordinates } from 'react-native-geolocation-service'

export interface UseDistanceProps {
  location?: GeoCoordinates
}

const HERE_API_KEY = 'vChVy3ttaW9KsQ1LeJCteHhBl8Xx50vNKwR-GOgn_3w'

function useLocationAddress({ location }: UseDistanceProps) {
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const { t } = useTranslation()

  const getAddress = useCallback(() => {
    if (location) {
      const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${HERE_API_KEY}&mode=retrieveAddresses&prox=${location.latitude},${location.longitude}`
      fetch(url)
        .then(res => res.json())
        .then(resJson => {
          // the response had a deeply nested structure :/
          if (
            resJson &&
            resJson.Response &&
            resJson.Response.View &&
            resJson.Response.View[0] &&
            resJson.Response.View[0].Result &&
            resJson.Response.View[0].Result[0]
          ) {
            const result = [
              resJson.Response.View[0].Result[0].Location.Address.HouseNumber,
              resJson.Response.View[0].Result[0].Location.Address.Street,
            ]
              .filter(o => !!o)
              .join(' ')
            setAddress(result)
            setError(undefined)
          } else {
            setAddress(undefined)
            setError(t('home:CanNotGetAddress'))
          }
        })
        .catch(e => {
          setAddress(undefined)
          setError(e.message)
        })
    } else {
      setAddress(undefined)
      setError(undefined)
    }
  }, [location, t])

  useEffect(() => {
    getAddress()
  }, [getAddress])

  return [address, error]
}

export default useLocationAddress
