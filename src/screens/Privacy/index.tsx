import React from 'react';
import {Box, Button, Center, Text, VStack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import CusImageBackground from '@components/CusImageBackground';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@routes/navigator';

type PrivacyProps = NativeStackScreenProps<IRootStackParamList, 'Privacy'>;
const Privacy: React.FC<PrivacyProps> = props => {
  const {navigation} = props;
  return (
    <CusImageBackground>
      <Center h={'full'} mx={'8px'}>
        <Text variant={'header_2'} mb={2}>
          Bảo mật thông tin
        </Text>
        <Text textAlign={'center'} mb={'12px'}>
          Tại Vietmind, thông tin của bạn luôn được bảo mật.
        </Text>
        <Text textAlign={'center'}>
          Tuy nhiên, Vietmind có thể sử dụng một số dữ liệu của bạn dưới dạng
          anonymous để nghiên cứu, phát triển ứng dụng, và nâng cao trải nghiệm.
        </Text>
        <VStack w={'full'} position={'absolute'} bottom={'16px'}>
          <Button
            variant={'cusPrimary'}
            mb={4}
            onPress={() => navigation.navigate('InputSelfInformation')}>
            Đồng ý
          </Button>
          <TouchableOpacity>
            <Text
              textDecorationLine={'underline'}
              textAlign={'center'}
              onPress={() => navigation.navigate('PrivacyDetail')}>
              Quyền riêng tư và bảo vệ dữ liệu người dùng
            </Text>
          </TouchableOpacity>
        </VStack>
      </Center>
    </CusImageBackground>
  );
};

export default Privacy;

// alignItems={'center'}
// justifyContent={'center'}
