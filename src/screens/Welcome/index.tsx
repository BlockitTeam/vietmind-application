import {
  Button,
  Center,
  Flex,
  Image,
  Text,
} from 'native-base';
import React from 'react';
import Focused from '@assets/images/focused.png';
import {storeFirstLoad} from '@services/asyncStorage/firstLoadApp';
import {useAtom} from 'jotai';
import {firstLoadAtom} from '@services/jotaiStorage/firstLoadAtom';
import CusImageBackground from '@components/layout/CusImageBackground';
const WelcomeScreen = () => {
  const [_, setFirstInit] = useAtom(firstLoadAtom);
  return (
    <CusImageBackground>
      <Flex
        h={'full'}
        alignItems={'center'}
        justifyContent={'center'}
        mx={'8px'}>
        <Center flex={1}>
          <Image
            source={Focused}
            width={278}
            height={183.84}
            mb={20}
            alt="Focused image"
          />
          <Text variant={'header_1'}>Vietmind</Text>
          <Text color={'text.default'} textAlign={'center'}>
            Chào mừng bạn đến với Vietmind - nơi kết nối dễ dàng với các chuyên
            gia tâm lý
          </Text>
        </Center>
        <Button
          mb={'36px'}
          maxW={'485px'}
          width={'100%'}
          variant={'cusPrimary'}
          onPress={async () =>
            await storeFirstLoad('0').then(value => {
              if (value === '1') {
                setFirstInit(true);
              } else {
                setFirstInit(false);
              }
            })
          }>
          Bắt đầu
        </Button>
      </Flex>
    </CusImageBackground>
  );
};

export default WelcomeScreen;
