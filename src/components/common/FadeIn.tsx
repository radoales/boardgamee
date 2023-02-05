import React, { useEffect, useRef } from 'react'
import { Animated, ViewStyle } from 'react-native'

type FadeInViewProps = {
  style: ViewStyle
  duration: number
  children: React.ReactNode
}

const FadeInView: React.FC<FadeInViewProps> = ({
  style,
  duration,
  children
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true
    }).start()
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim
      }}
    >
      {children}
    </Animated.View>
  )
}

export default FadeInView
