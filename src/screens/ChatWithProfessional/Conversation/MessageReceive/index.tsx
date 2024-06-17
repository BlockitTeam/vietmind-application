import {Box, Text} from 'native-base';
import React from 'react';

type MessageReceiveProps = {
  text: string;
};

const MessageReceive: React.FC<MessageReceiveProps> = props => {
  const {text} = props;
  return (
    <Box
      maxW={'3/4'}
      alignSelf={'flex-start'}
      borderTopRadius={'8px'}
      borderBottomRightRadius={'8px'}
      padding={2}
      borderWidth={1}
      borderColor={'primary.medium'}>
      <Text>{text}</Text>
    </Box>
  );
};

export default MessageReceive;
