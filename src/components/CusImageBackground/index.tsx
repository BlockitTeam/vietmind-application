import React, {PropsWithChildren, ReactNode} from 'react';
import {ImageBackground} from 'react-native';
import BackGround from '@images/Background.png';
import {Center, HStack, VStack} from 'native-base';

type CusImageBackgroundProps = {
  bottomButton?: ReactNode;
} & PropsWithChildren;
const CusImageBackground: React.FC<CusImageBackgroundProps> = props => {
  const {children, bottomButton} = props;
  return (
    <ImageBackground source={BackGround}>
      {bottomButton ? (
        <Center h={'full'} mx={'16px'}>
          <Center
            w={'full'}
            flex={1}
            alignItems={'center'}
            justifyContent={'center'}>
            {children}
          </Center>
          <Center w={'full'} mb={'16px'}>
            {bottomButton}
          </Center>
        </Center>
      ) : (
        children
      )}
    </ImageBackground>
  );
};

export default CusImageBackground;
