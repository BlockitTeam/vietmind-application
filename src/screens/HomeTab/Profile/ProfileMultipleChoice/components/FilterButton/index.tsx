import {ChevronRightIcon, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';

type FilterButtonProps = {
  label: string;
  value: string;
};
const FilterButton: React.FC<FilterButtonProps> = props => {
  const {label, value} = props;
  return (
    <TouchableOpacity>
      <HStack
        alignItems={'center'}
        padding={'12px 16px'}
        borderWidth={1}
        borderColor={'primary.medium'}
        bgColor={'primary.primary_light'}
        borderRadius={'8px'}>
        <VStack flex={1}>
          <Text variant={'body_large_bold'}>{label}</Text>
          <Text>{value}</Text>
        </VStack>
        <Text>
          <ChevronRightIcon />
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default FilterButton;
