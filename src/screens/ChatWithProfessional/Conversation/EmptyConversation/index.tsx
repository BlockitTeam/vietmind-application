import {Box, Center, Circle, Text} from 'native-base';
import React from 'react';

type EmptyConversationProps = {};
const EmptyConversation: React.FC<EmptyConversationProps> = props => {
  return (
    <Center pb={4}>
      <Circle h={120} w={120} backgroundColor={'primary.medium'} mb={4} />
      <Text variant={'header_2'} textAlign={'center'} mb={2}>
        B S
      </Text>
      <Text variant={'header_2'} textAlign={'center'} mb={4}>
        Trịnh Thị Thu Thảo
      </Text>
      <Text textAlign={'center'}>Viện Sức khỏe Tâm thần</Text>
      <Text textAlign={'center'} mb={4}>
        Bệnh viện Bạch Mai
      </Text>
    </Center>
  );
};

export default EmptyConversation;
