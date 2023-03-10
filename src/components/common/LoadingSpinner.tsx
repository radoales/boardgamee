import React from 'react'
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native'
import colors from '../../styles/colors'

interface LoadingSpinnerProps {
  size?: number
  color?: 'white' | 'blue'
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size,
  color = 'blue'
}) => {
  return (
    <View style={styles.spinner}>
      <ActivityIndicator
        size={Platform.OS === 'android' ? size ?? 100 : 'large'}
        color={color === 'blue' ? colors.blue[600] : colors.white}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default LoadingSpinner
