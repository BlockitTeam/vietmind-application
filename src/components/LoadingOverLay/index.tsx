import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Spinner} from 'native-base'

const LoadingOverlay = () => {
  return (
    <View style={styles.overlay}>
      <Spinner />
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', // Position overlay on top of other content
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with 50% transparency
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    zIndex: 999999, // Ensure it appears above other components
  },
})

export default LoadingOverlay
