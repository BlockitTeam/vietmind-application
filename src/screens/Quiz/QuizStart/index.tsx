import React from 'react';
import CusImageBackground from '@components/layout/CusImageBackground';
import Well1 from '@images/Well1.png';
import {Button, Image, Text} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@routes/navigator';
import { Platform } from 'react-native';

type QuizStartProps = NativeStackScreenProps<IRootStackParamList, 'QuizStart'>;
const QuizStart: React.FC<QuizStartProps> = props => {
  const {navigation} = props;
  return (
    <CusImageBackground
      bottomButton={
        <Button
          w={'full'}
          mb={Platform.OS === 'ios' ? 8 : 0}
          variant={'cusPrimary'}
          onPress={() => navigation.navigate('QuizStartConfirm')}>
          Bắt đầu làm trắc nghiệm
        </Button>
      }>
      <Image source={Well1} w={220} h={245.34} alt="Feeling good image" />
      <Text variant={'header_2'} my={4}>
        Trắc nghiệm tâm lý
      </Text>
      <Text
        variant={'body_medium_regular'}
        textAlign={'center'}
        _android={{lineHeight: '32px'}}>
        Để đánh giá tình trạng tâm lý, bạn vui lòng hoàn thành bài trắc nghiệm
        sau. Kết quả của bài trắc nghiệm sẽ giúp Vietmind đưa ra tư vấn tốt hơn.
      </Text>
    </CusImageBackground>
  );
};

export default QuizStart;
