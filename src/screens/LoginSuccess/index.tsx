import React from 'react';
import SelfLove1 from '@images/SelfLove1.png';
import {Box, Button, Image, Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import CusImageBackground from '@components/layout/CusImageBackground';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@routes/navigator';
import {removeJSessionID} from '@services/asyncStorage/jsessionID';
import {useCurrentUser} from '@hooks/auth';
import axios from 'axios';
type LoginSuccessProps = NativeStackScreenProps<
  IRootStackParamList,
  'LoginSuccess'
>;

const LoginSuccess: React.FC<LoginSuccessProps> = props => {
  const {navigation} = props;
  const {refetch} = useCurrentUser();

  return (
    <CusImageBackground
      bottomButton={
        <Button
          width={'100%'}
          maxW={'485px'}
          variant={'cusPrimary'}
          onPress={() => {
            navigation.navigate('Privacy');
          }}>
          Tiếp tục
        </Button>
      }>
      <VStack flex={1} style={styles.vStack} space={2}>
        <Image
          source={SelfLove1}
          width={245.96}
          height={254.2}
          alt="SelfLove image"
          mb={20}
        />
        <Text variant={'header_2'} mb={2} textAlign={'center'}>
          Đăng ký thành công
        </Text>
        <Text textAlign={'center'}>Chào mừng bạn đến với Vietmind.</Text>
      </VStack>
    </CusImageBackground>
  );
};

export default LoginSuccess;

const styles = StyleSheet.create({
  vStack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
