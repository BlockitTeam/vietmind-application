import {Box, HStack, Text, View, VStack} from 'native-base';
import React, {PropsWithChildren, ReactNode} from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackGround from '@images/Background.png';
type HeaderLayoutProps = {
  title: string;
} & PropsWithChildren;
const HeaderLayout: React.FC<HeaderLayoutProps> = props => {
  const {title, children} = props;

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{backgroundColor: 'white', flex: 1}}>
      <VStack flex={1}>
        <HStack
          alignItems={'center'}
          justifyContent={'center'}
          position={'relative'}
          backgroundColor={'primary.medium25'}
          py={4}>
          <Text variant="caption_regular">{title}</Text>
        </HStack>
        <VStack flex={1} px={'16px'}>
          {children}
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default HeaderLayout;
