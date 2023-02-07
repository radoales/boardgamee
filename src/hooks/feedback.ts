import { useEffect } from 'react'
import { Platform, ToastAndroid } from 'react-native'

export const useFeedback = (
  isSuccess?: boolean,
  isError?: boolean,
  message?: string
) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (isSuccess && message) {
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        )
      }
      if (isError) {
        ToastAndroid.showWithGravity(
          message ?? '',
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        )
      }
    }
  }, [isError, isSuccess, message])
}
