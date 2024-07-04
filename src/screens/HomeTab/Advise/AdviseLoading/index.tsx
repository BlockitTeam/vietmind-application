import {HStack, VStack, Circle, Skeleton, Box, Text} from 'native-base';
import React from 'react';

const AdviseLoading = () => {
  return (
    <>
      <Text variant={'body_large_bold'}>Danh sách bác sĩ</Text>
      <VStack mt={2} space={2}>
        {Array.from(Array(10).keys()).map(item => {
          return (
            <HStack space={2} key={item}>
              <Skeleton h={'60px'} w={'60px'} />
              <VStack space={2}>
                <Skeleton h={'26px'} w={'287px'} />
                <Skeleton h={'26px'} w={'287px'} />
              </VStack>
            </HStack>
          );
        })}
      </VStack>
      <Box h={4} />
      {/* <Text variant={'body_large_bold'}>Tư vấn với chatbot</Text> */}
    </>
    // <>
    //   <Box h={4} />
    //   <VStack space={2} px={'16px'}>
    //     <HStack flex={1} space={2} alignItems={'center'}>
    //       <Skeleton size="40px" rounded="full" startColor="coolGray.200" />
    //       <VStack space={2}>
    //         <Skeleton h="16px" rounded="full" startColor="coolGray.200" />
    //         <Skeleton h="16px" rounded="full" startColor="coolGray.200" />
    //       </VStack>
    //     </HStack>
    //   </VStack>
    //   <VStack space={2} px={'16px'}>
    //     <HStack flex={1} space={2} alignItems={'center'}>
    //       <Skeleton size="40px" rounded="full" startColor="coolGray.200" />
    //       <VStack space={2}>
    //         <Skeleton h="16px" rounded="full" startColor="coolGray.200" />
    //         <Skeleton h="16px" rounded="full" startColor="coolGray.200" />
    //       </VStack>
    //     </HStack>
    //   </VStack>
    //   <VStack space={2} px={'16px'}>
    //     <HStack flex={1} space={2} alignItems={'center'}>
    //       <Skeleton size="40px" rounded="full" startColor="coolGray.200" />
    //       <VStack space={2}>
    //         <Skeleton h="16px" rounded="full" startColor="coolGray.200" />
    //         <Skeleton h="16px" rounded="full" startColor="coolGray.200" />
    //       </VStack>
    //     </HStack>
    //   </VStack>
    // </>
  );
};

export default AdviseLoading;
