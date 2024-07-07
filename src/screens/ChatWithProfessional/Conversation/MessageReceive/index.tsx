import {Box, Text} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

type MessageReceiveProps = {
  text: string;
};

const MessageReceive: React.FC<MessageReceiveProps> = props => {
  const {text} = props;
  console.log('rerender MessageReceive');

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
        alignSelf={'flex-start'}
        borderTopRadius={'8px'}
        borderBottomRightRadius={'8px'}
        padding={2}
        borderWidth={1}
        borderColor={'primary.medium'}>
        <Text variant={'body_small_regular'}>{text}</Text>
      </Box>
    </Animated.View>
  );
};

export default React.memo(MessageReceive);
