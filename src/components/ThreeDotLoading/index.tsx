// LoadingDots.tsx

import {colors} from '@assets/colors'
import {Text} from 'native-base'
import React, {useEffect, useRef} from 'react'
import {View, Animated, Easing, StyleSheet} from 'react-native'

type LoadingDotsProps = {
  title?: string
  dotSize?: number
}
const LoadingDots: React.FC<LoadingDotsProps> = ({dotSize, title}) => {
  const dot1 = useRef(new Animated.Value(0)).current
  const dot2 = useRef(new Animated.Value(0)).current
  const dot3 = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.delay(delay),
        ]),
      ).start()
    }

    animateDot(dot1, 100)
    animateDot(dot2, 200)
    animateDot(dot3, 300)
  }, [dot1, dot2, dot3])

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        {title && <Text style={styles.title}>{title}</Text>}

        <Animated.View
          style={[
            styles.dot,
            {
              width: dotSize ? dotSize : 10,
              height: dotSize ? dotSize : 10,
              opacity: dot1,
              transform: [{translateY: 2}],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              width: dotSize ? dotSize : 10,
              height: dotSize ? dotSize : 10,
              opacity: dot2,
              transform: [{translateY: 2}],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              width: dotSize ? dotSize : 10,
              height: dotSize ? dotSize : 10,
              opacity: dot3,
              transform: [{translateY: 2}],
            },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 5,
    backgroundColor: colors.text.neutral_teriary,
    marginHorizontal: 2,
  },
  title: {
    fontSize: 14,
    color: colors.text.neutral_teriary,
  },
})

export default LoadingDots
