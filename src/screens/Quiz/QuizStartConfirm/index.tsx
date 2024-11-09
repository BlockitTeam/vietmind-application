import React from 'react';
import CusImageBackground from '@components/layout/CusImageBackground';
import Well1 from '@images/Well1.png';
import {Button, Image, Text} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@routes/navigator';

type QuizStartConfirmProps = NativeStackScreenProps<
  IRootStackParamList,
  'QuizStartConfirm'
>;
const QuizStartConfirm: React.FC<QuizStartConfirmProps> = props => {
  const {navigation} = props;
  return (
    <CusImageBackground
      bottomButton={
        <Button
          w={'full'}
          variant={'cusPrimary'}
          onPress={() => navigation.navigate('QuizDetail')}>
          Tiếp theo
        </Button>
      }>
      <Text variant={'body_medium_regular'} textAlign={'center'}>
        Hãy cho chúng tôi biết, trong vòng 2 tuần vừa qua có bao nhiêu lần bạn
        bị lo lắng buồn phiền vì những vấn đề được liệt kê dưới đây?
      </Text>
    </CusImageBackground>
  );
};

export default QuizStartConfirm;
