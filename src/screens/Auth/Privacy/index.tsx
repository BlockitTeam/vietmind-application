import React from 'react'
import {Box, Button, Center, Text, VStack} from 'native-base'
import {TouchableOpacity} from 'react-native'
import CusImageBackground from '@components/layout/CusImageBackground'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {IRootStackParamList} from '@routes/navigator'

type PrivacyProps = NativeStackScreenProps<IRootStackParamList, 'Privacy'>
const Privacy: React.FC<PrivacyProps> = (props) => {
  const {navigation} = props
  return (
    <CusImageBackground
      bottomButton={
        <VStack w={'full'}>
          <Button
            variant={'cusPrimary'}
            mb={4}
            onPress={() => navigation.navigate('InputSelfInformation')}>
            Đồng ý
          </Button>
          <TouchableOpacity>
            <Text
              mb={5}
              textDecorationLine={'underline'}
              textAlign={'center'}
              onPress={() => navigation.navigate('PrivacyDetail')}>
              Quyền riêng tư và bảo vệ dữ liệu người dùng
            </Text>
          </TouchableOpacity>
        </VStack>
      }>
      <Text variant={'header_2'} mb={2}>
        Bảo mật thông tin
      </Text>
      <Text textAlign={'center'} mb={'20px'} variant={'body_medium_regular'}>
        Tại Vietmind, thông tin của bạn luôn được bảo mật.
      </Text>
      <Text
        textAlign={'center'}
        variant={'body_medium_regular'}
        lineHeight={'32px'}>
        Tuy nhiên, Vietmind có thể sử dụng một số dữ liệu của bạn dưới dạng
        anonymous để nghiên cứu, phát triển ứng dụng, và nâng cao trải nghiệm.
      </Text>
    </CusImageBackground>
  )
}

export default Privacy

// alignItems={'center'}
// justifyContent={'center'}
