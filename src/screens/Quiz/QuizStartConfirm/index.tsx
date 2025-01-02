import React from 'react'
import CusImageBackground from '@components/layout/CusImageBackground'
import Well1 from '@images/Well1.png'
import {Button, Image, Text} from 'native-base'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {IRootStackParamList} from '@routes/navigator'
import {Platform} from 'react-native'

type QuizStartConfirmProps = NativeStackScreenProps<
  IRootStackParamList,
  'QuizStartConfirm'
>
const QuizStartConfirm: React.FC<QuizStartConfirmProps> = (props) => {
  const {navigation} = props
  return (
    <CusImageBackground
      bottomButton={
        <Button
          mb={Platform.OS === 'ios' ? 8 : 0}
          w={'full'}
          variant={'cusPrimary'}
          onPress={() => navigation.navigate('QuizDetail')}>
          Tiếp theo
        </Button>
      }>
      <Text
        variant={'body_large_regular'}
        textAlign={'center'}
        _android={{lineHeight: '20px'}}>
        Đầu tiên, bạn sẽ trả lời các câu hỏi sàng lọc chung. Tiếp đó, dựa vào
        kết quả, bạn sẽ trả lời các câu hỏi sàng lọc chuyên sâu.
      </Text>
    </CusImageBackground>
  )
}

export default QuizStartConfirm
