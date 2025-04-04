import {Box, Text} from 'native-base'
import React from 'react'
import {Animated} from 'react-native'

type MessageSystemProps = {
  text: string
}

const MessageSystem: React.FC<MessageSystemProps> = (props) => {
  const {text} = props
  return (
    <Animated.View>
      <Box w={'full'} backgroundColor={'transparent'}>
        <Text variant={'body_small_italic'} textAlign={'center'}>
          {text}
        </Text>
      </Box>
    </Animated.View>
  )
}

export default React.memo(MessageSystem)
