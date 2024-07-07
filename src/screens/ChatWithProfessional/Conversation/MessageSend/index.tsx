import {Box, Text} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

type MessageSendProps = {
  text: string;
};

const MessageSend: React.FC<MessageSendProps> = props => {
  const {text} = props;
  console.log('rerender');

  // Create a ref for the animated opacity value
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Run the fade-in animation when the component mounts
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={{opacity}}>
      <Box
        maxW={'3/4'}
        alignSelf={'flex-end'}
        bgColor={'background.medium'}
        borderTopRadius={'8px'}
        borderBottomLeftRadius={'8px'}
        p={2}>
        <Text variant={'body_small_regular'}>{text}</Text>
      </Box>
    </Animated.View>
  );
};

export default React.memo(MessageSend);
