import React from 'react'
import {Button, Text, VStack} from 'native-base'
import {IBottomParamList, IRootStackParamList} from '@routes/navigator'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {CompositeScreenProps} from '@react-navigation/native'
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import HeaderBack from '@components/layout/HeaderBack'

type DetailResultProps = CompositeScreenProps<
  NativeStackScreenProps<IRootStackParamList, 'DetailResult'>,
  BottomTabScreenProps<IBottomParamList, 'Home'>
>

const DetailResult: React.FC<DetailResultProps> = (props) => {
  const {navigation} = props
  return (
    <HeaderBack
      withBackGround={true}
      title="Kết quả trắc nghiệm"
      bottomChildren={
        <VStack space={2} w="full" mb={6}>
          <Button
            variant={'cusPrimary'}
            w={'full'}
            onPress={() => navigation.replace('SetTimeAppointment')}>
            Chat với chuyên gia
          </Button>
          <Button
            variant={'cusOutline'}
            w={'full'}
            onPress={() => navigation.replace('BottomTab', {screen: 'Home'})}>
            Trở về trang chủ
          </Button>
        </VStack>
      }>
      <VStack alignItems={'center'} justifyContent={'center'} h={'100%'}>
        <Text variant={'header_1'} pt={'12.5%'} pb={4}>
          Kết quả Sàng lọc
        </Text>
        <Text variant={'body_large_regular'} textAlign={'center'} pt={4}>
          Với những vấn đề bạn đang gặp phải, bạn nên tham khảo ý kiến của
          chuyên gia tư vấn
        </Text>
      </VStack>
    </HeaderBack>
  )
}

export default DetailResult
