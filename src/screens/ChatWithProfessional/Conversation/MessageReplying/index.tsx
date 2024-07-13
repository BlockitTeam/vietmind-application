import LoadingDots from '@components/ThreeDotLoading';
import {formatTime} from '@services/function/dateTime';
import {Box, Text} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

type MessageReplyingProps = {
  text: string;
};

const MessageReplying: React.FC<MessageReplyingProps> = props => {
  const {text} = props;
  console.log('rerender MessageReceive');

  // Create refs for the animated opacity and position values
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(2)).current;

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
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);
  return (
    <Animated.View style={{opacity, transform: [{translateY}]}}>
      <Box
        maxW={'3/4'}
        alignSelf={'flex-start'}
        borderTopRadius={'8px'}
        borderBottomRightRadius={'8px'}
        padding={2}
        backgroundColor={'#E0E9ED'}>
        <LoadingDots title={text} dotSize={2} />

        <Text fontSize={8} pt={1}>
          {formatTime(new Date().toISOString())}
        </Text>
      </Box>
    </Animated.View>
  );
};

export default React.memo(MessageReplying);
