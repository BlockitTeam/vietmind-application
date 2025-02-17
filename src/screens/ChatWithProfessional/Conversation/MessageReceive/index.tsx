import {Box, Text} from 'native-base'
import React, {useEffect, useRef} from 'react'
import {Animated, Linking} from 'react-native'

type MessageReceiveProps = {
  text: string
  time: string
}

const MessageReceive: React.FC<MessageReceiveProps> = (props) => {
  const {text, time} = props

  // Create refs for the animated opacity and position values
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(2)).current

  useEffect(() => {
    // Run the fade-in and position animation when the component mounts
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -10,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [opacity, translateY])

    const handleUrlPress = (url: string) => {
      Linking.openURL(url).catch((err) =>
        console.error('Failed to open URL:', err),
      )
    }

    // Function to render text with clickable URLs
    const renderTextWithLinks = (text: string) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g
      const parts = text.split(urlRegex) // Split text into parts with URLs

      return parts.map((part, index) => {
        if (part.match(urlRegex)) {
          return (
            <Text
              key={index}
              color="blue.500"
              onPress={() => handleUrlPress(part)}
              style={{textDecorationLine: 'underline'}}>
              {part}
            </Text>
          )
        }
        return <Text key={index}>{part}</Text>
      })
    }
  return (
    <Animated.View style={{opacity, transform: [{translateY}]}}>
      <Box
        maxW={'3/4'}
        alignSelf={'flex-start'}
        borderTopRadius={'8px'}
        borderBottomRightRadius={'8px'}
        padding={2}
        backgroundColor={'#E0E9ED'}>
        <Text selectable variant={'body_small_regular'}>
          {renderTextWithLinks(text)}
        </Text>
        <Text fontSize={8} pt={1}>
          {time}
        </Text>
      </Box>
    </Animated.View>
  )
}

export default React.memo(MessageReceive)
