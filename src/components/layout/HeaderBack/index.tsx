import {Box, HStack, Text, View, VStack} from 'native-base';
import React, {PropsWithChildren, ReactNode} from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackGround from '@images/Background.png';
import {useNavigation} from '@react-navigation/native';
type HeaderBackProps = {
  title: string;
  buttonBack?: ReactNode;
  buttonBackPress?: () => void;
  bottomChildren?: ReactNode;
  bottomPadding?: string;
  withBackGround?: boolean;
} & PropsWithChildren;
const HeaderBack: React.FC<HeaderBackProps> = props => {
  const {
    title,
    buttonBack,
    buttonBackPress,
    bottomChildren,
    withBackGround,
    bottomPadding,
    children,
  } = props;

  const navigate = useNavigation();
  if (withBackGround)
    return (
      <SafeAreaView
        style={{backgroundColor: 'white', flex: 1}}
        edges={['right', 'top', 'left']}>
        <ImageBackground source={BackGround}>
          <VStack h={'full'}>
            <HStack
              alignItems={'center'}
              justifyContent={'center'}
              position={'relative'}
              py={4}>
              {buttonBack ? (
                <Box position={'absolute'} left={'8px'}>
                  {buttonBack}
                </Box>
              ) : null}
              <Text variant="caption_regular">{title}</Text>
            </HStack>
            <VStack flex={1} px={'16px'}>
              {children}
            </VStack>
            <VStack mb={'24px'} px={bottomPadding ? bottomPadding : '16px'}>
              {bottomChildren}
            </VStack>
          </VStack>
        </ImageBackground>
      </SafeAreaView>
    );
  return (
    <SafeAreaView
      style={{backgroundColor: 'white', flex: 1}}
      edges={['right', 'top', 'left']}>
      <VStack h={'full'}>
        <HStack
          alignItems={'center'}
          justifyContent={'center'}
          position={'relative'}
          backgroundColor={'primary.medium25'}
          py={4}>
          {buttonBack ? (
            <TouchableOpacity
              onPress={() => {
                buttonBackPress ? buttonBackPress() : null;
              }}
              style={{
                position: 'absolute',
                left: 0,
                padding: 8,
              }}>
              {buttonBack}
            </TouchableOpacity>
          ) : null}
          <Text variant="caption_regular">{title}</Text>
        </HStack>
        <VStack flex={1} px={'16px'}>
          {children}
        </VStack>
        <VStack
          mb={'16px'}
          w={'full'}
          px={bottomPadding ? bottomPadding : '16px'}>
          {bottomChildren}
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default HeaderBack;
