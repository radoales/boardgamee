import { useCallback, useEffect, useRef } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { Platform } from 'react-native'
import { onlineManager } from '@tanstack/react-query'
import { useFocusEffect } from '@react-navigation/native'

export const useOnlineManager = () => {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      onlineManager.setEventListener((setOnline) => {
        return NetInfo.addEventListener((state) => {
          setOnline(!!state.isConnected)
        })
      })
    }
  }, [])
}

export const useRefreshOnFocus = <T>(refetch: () => Promise<T>) => {
  const firstTimeRef = useRef(true)

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      refetch()
    }, [refetch])
  )
}
