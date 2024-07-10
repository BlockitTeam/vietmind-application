import {Box, Text} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

type MessageSendProps = {
  text: string;
  time: string;
};

const MessageSend: React.FC<MessageSendProps> = props => {
  const {text, time} = props;
  console.log('rerender');

  // Create refs for the animated opacity and position values
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(2)).current;

  useEffect(() => {
    // Run the fade-in and position animation when the component mounts
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <Animated.View style={{opacity, transform: [{translateY}]}}>
      <Box
        maxW={'3/4'}
        alignSelf={'flex-end'}
        bgColor={'#C2F8CB'}
        borderTopRadius={'8px'}
        borderBottomLeftRadius={'8px'}
        p={2}>
        <Text variant={'body_small_regular'}>{text}</Text>
        <Text alignSelf={'flex-end'} fontSize={8} pt={1}>
          {time}
        </Text>
      </Box>
    </Animated.View>
  );
};

export default React.memo(MessageSend);
