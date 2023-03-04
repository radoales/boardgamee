import React from 'react'
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native'
import colors from '../../styles/colors'

const LoadingSpinner = () => {
  return (
    <View style={styles.spinner}>
      <ActivityIndicator
        size={Platform.OS === 'android' ? 150 : 'large'}
        color={colors.blue[600]}
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
