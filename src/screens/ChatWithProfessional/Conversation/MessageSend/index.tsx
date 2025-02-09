import {Box, Text, Button, Modal, HStack, VStack} from 'native-base'
import React, {useEffect, useRef, useState} from 'react'
import {Animated, TouchableWithoutFeedback, Linking} from 'react-native'

type MessageSendProps = {
  text: string
  time: string
}

const MessageSend: React.FC<MessageSendProps> = ({text, time}) => {
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(2)).current
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [urlToOpen, setUrlToOpen] = useState<string | null>(null)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -10,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [opacity, translateY])

  // Function to show the modal for URL confirmation
  const handleUrlPress = (url: string) => {
    setUrlToOpen(url)
    setIsModalVisible(true)
  }

  // Function to open URL in browser after user confirmation
  const openUrl = () => {
    if (urlToOpen) {
      Linking.openURL(urlToOpen).catch((err) =>
        console.error('Failed to open URL:', err),
      )
      setIsModalVisible(false)
    }
  }

  // Function to cancel URL opening
  const cancelUrlOpen = () => {
    setIsModalVisible(false)
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
            onLongPress={() => handleUrlPress(part)}
            style={{textDecorationLine: 'underline'}}>
            {part}
          </Text>
        )
      }
      return (
        <Text selectable key={index}>
          {part}
        </Text>
      )
    })
  }

  return (
    <TouchableWithoutFeedback>
      <Animated.View style={{opacity, transform: [{translateY}]}}>
        <Box
          maxW={'3/4'}
          alignSelf={'flex-end'}
          bgColor={'#C2F8CB'}
          borderTopRadius={'8px'}
          borderBottomLeftRadius={'8px'}
          p={2}>
          <Text variant={'body_small_regular'} selectable>
            {renderTextWithLinks(text)}
          </Text>
          <Text alignSelf={'flex-end'} fontSize={8} pt={1}>
            {time}
          </Text>
        </Box>

        {/* Custom Modal */}
        <Modal isOpen={isModalVisible} onClose={cancelUrlOpen}>
          <Modal.Content w={'90%'}>
            <Modal.CloseButton />
            <Modal.Header>Mở liên kết?</Modal.Header>
            <Modal.Body>
              <VStack>
                <Text>
                  Bạn có muốn mở liên kết:{' '}
                  <Text
                    color="blue.500"
                    style={{textDecorationLine: 'underline'}}>
                    {urlToOpen}
                  </Text>
                </Text>
                <Button.Group space={2} pt={4} alignSelf={'flex-end'}>
                  <Button variant={'cusOutline'} onPress={cancelUrlOpen}>
                    Cancel
                  </Button>
                  <Button variant={'cusPrimary'} onPress={openUrl}>
                    Open
                  </Button>
                </Button.Group>
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default React.memo(MessageSend)
