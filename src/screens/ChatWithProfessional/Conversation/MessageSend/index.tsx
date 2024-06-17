import {Box, Text} from 'native-base';
import React from 'react';
type MessageSendProps = {
  text: string;
};
const MessageSend: React.FC<MessageSendProps> = props => {
  const {text} = props;
  return (
    <Box
      maxW={'3/4'}
      alignSelf={'flex-end'}
      bgColor={'background.medium'}
      borderTopRadius={'8px'}
      borderBottomLeftRadius={'8px'}
      p={2}>
      <Text>{text}</Text>
    </Box>
  );
};

export default MessageSend;
