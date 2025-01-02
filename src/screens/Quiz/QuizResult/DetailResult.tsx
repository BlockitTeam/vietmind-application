// onPress={() => navigation.replace('SetTimeAppointment')}>

import React, {useEffect, useState} from 'react'
import CusImageBackground from '@components/layout/CusImageBackground'
import {Button, Text, useToast, VStack} from 'native-base'
import {IBottomParamList, IRootStackParamList} from '@routes/navigator'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {CompositeScreenProps, useNavigation} from '@react-navigation/native'
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import HeaderBack from '@components/layout/HeaderBack'
import {useAtom} from 'jotai'
import {curUserAtom} from '@services/jotaiStorage/curUserAtom'
import {resultCommonFilterAtom} from '@services/jotaiStorage/resltCommonFilter'
import LoadingOverlay from '@components/LoadingOverLay'
import {useGetInfSurveyById} from '@hooks/survey'

type DetailResultProps = CompositeScreenProps<
  NativeStackScreenProps<IRootStackParamList, 'DetailResult'>,
  BottomTabScreenProps<IBottomParamList, 'Home'>
>

const DetailResult: React.FC<DetailResultProps> = (props) => {
  const {navigation} = props
  const [resultCommonFilter, setResultCommonFilter] = useAtom(
    resultCommonFilterAtom,
  )
  const toast = useToast()
  const [curUser, setCurUser] = useAtom(curUserAtom)

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
          Kết quả sàn lọc
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
