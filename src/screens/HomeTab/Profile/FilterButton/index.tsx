import {ChevronRightIcon, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const FilterButton = () => {
  return (
    <TouchableOpacity>
      <HStack
        alignItems={'center'}
        padding={'12px 16px'}
        borderWidth={1}
        borderColor={'primary.medium'}
        borderRadius={'8px'}>
        <VStack flex={1}>
          <Text>Lo âu</Text>
          <Text>5/10</Text>
        </VStack>
        <Text>
          <ChevronRightIcon />
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default FilterButton;
