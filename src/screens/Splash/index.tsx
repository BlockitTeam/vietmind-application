import CusImageBackground from '@components/layout/CusImageBackground';
import {Flex, Text} from 'native-base';
import React from 'react';
const Splash = () => {
  return (
    <CusImageBackground>
      <Flex
        h={'full'}
        alignItems={'center'}
        fontFamily={'heading'}
        justifyContent={'center'}>
        <Text variant={'header_1'}>Vietmind</Text>
      </Flex>
    </CusImageBackground>
  );
};

export default Splash;
