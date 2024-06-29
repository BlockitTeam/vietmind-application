import {StyleSheet} from 'react-native';
import React from 'react';
import {Button, HStack, Text, VStack} from 'native-base';

type HistoryAdviseItemType = {
  drName: string;
  drId: string;
  time: string;
  idConversation: string;
};

const HistoryAdviseItem: React.FC<HistoryAdviseItemType> = props => {
  const {drName, drId, time, idConversation} = props;
  return (
    <HStack
      borderRadius={'8px'}
      borderWidth={1}
      borderColor={'primary.primary_light_medium'}
      bgColor={'primary.primary_light'}
      padding={'13px 12px'}>
      <VStack flex={1}>
        <Text variant={'body_medium_bold'}>{drName}</Text>
        <Text variant={'body_medium_regular'} color={'text.neutral_secondary'}>
          {time}
        </Text>
      </VStack>
      <Button
        variant={'cusOutline'}
        h={'32px'}
        px={'16px'}
        py={'0px'}
        borderRadius={'8px'}>
        <Text variant={'body_small_bold'}>Xem lại</Text>
      </Button>
    </HStack>
  );
};

export default HistoryAdviseItem;

const styles = StyleSheet.create({});
