import { useEffect, useState } from 'react'
import { Platform, ToastAndroid } from 'react-native'

export const useFeedback = (
  isSuccess?: boolean,
  isError?: boolean,
  message?: string
) => {
  useEffect(() => {
    if ((isSuccess || isError) && Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        message ?? '',
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      )
    }
  }, [isSuccess])
}
