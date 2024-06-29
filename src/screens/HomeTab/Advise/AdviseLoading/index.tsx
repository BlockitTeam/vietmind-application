import {HStack, VStack, Circle, Skeleton, Box} from 'native-base';
import React from 'react';

const AdviseLoading = () => {
  return (
    <>
      <Box h={4} />
      <VStack space={2} px={'16px'}>
        <HStack flex={1} space={2} alignItems={'center'}>
          <Skeleton size="40px" rounded="full" startColor="coolGray.200" />
          <VStack space={2}>
            <Skeleton h="16px" rounded="full" startColor="coolGray.200" />
            <Skeleton h="16px" rounded="full" startColor="coolGray.200" />
          </VStack>
        </HStack>
      </VStack>
      <VStack space={2} px={'16px'}>
        <HStack flex={1} space={2} alignItems={'center'}>
          <Skeleton size="40px" rounded="full" startColor="coolGray.200" />
          <VStack space={2}>
            <Skeleton h="16px" rounded="full" startColor="coolGray.200" />
            <Skeleton h="16px" rounded="full" startColor="coolGray.200" />
          </VStack>
        </HStack>
      </VStack>
      <VStack space={2} px={'16px'}>
        <HStack flex={1} space={2} alignItems={'center'}>
          <Skeleton size="40px" rounded="full" startColor="coolGray.200" />
          <VStack space={2}>
            <Skeleton h="16px" rounded="full" startColor="coolGray.200" />
            <Skeleton h="16px" rounded="full" startColor="coolGray.200" />
          </VStack>
        </HStack>
      </VStack>
    </>
  );
};

export default AdviseLoading;
