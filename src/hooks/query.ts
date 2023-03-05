import React from 'react'
import NetInfo from '@react-native-community/netinfo'
import { Platform } from 'react-native'
import { onlineManager } from '@tanstack/react-query'
import { useFocusEffect } from '@react-navigation/native'

export const useOnlineManager = () => {
  React.useEffect(() => {
    // React Query already supports on reconnect auto refetch in web browser
    if (Platform.OS !== 'web') {
      return NetInfo.addEventListener((state) => {
        onlineManager.setOnline(
          state.isConnected != null &&
            state.isConnected &&
            Boolean(state.isInternetReachable)
        )
      })
    }
  }, [])
}

export const useRefreshOnFocus = <T>(refetch: () => Promise<T>) => {
  const firstTimeRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      refetch()
    }, [refetch])
  )
}
