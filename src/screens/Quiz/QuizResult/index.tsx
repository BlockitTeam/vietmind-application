import React from 'react';
import CusImageBackground from '@components/CusImageBackground';
import {Button, Text, VStack} from 'native-base';
import {IBottomParamList, IRootStackParamList} from '@routes/navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

type QuizResultProps = CompositeScreenProps<
  NativeStackScreenProps<IRootStackParamList, 'QuizResult'>,
  BottomTabScreenProps<IBottomParamList, 'Home'>
>;

const QuizResult: React.FC<QuizResultProps> = props => {
  const {navigation, route} = props;
  const {result, typeResult} = route.params;
  return (
    <CusImageBackground
      bottomButton={
        typeResult === 'bad' ? (
          <VStack space={2} w="full">
            <Button variant={'cusPrimary'} w={'full'}>
              Về trang chủ
            </Button>
            <Button variant={'cusOutline'} w={'full'}>
              Tư vấn 24/7
            </Button>
          </VStack>
        ) : (
          <VStack space={2} w="full">
            <Button variant={'cusPrimary'} w={'full'}>
              Chat với chuyên gia
            </Button>
            <Button
              variant={'cusOutline'}
              w={'full'}
              onPress={() => navigation.navigate('BottomTab')}>
              Bỏ qua
            </Button>
          </VStack>
        )
      }>
      <Text variant={'header_1'} pt={'12.5%'} pb={4}>
        Kết quả
      </Text>
      <Text variant={'body_large_regular'}>Stress: {result.stress}</Text>
      <Text variant={'body_large_regular'}>Lo âu: {result.loAu}</Text>
      <Text variant={'body_large_regular'}>Trầm cảm: {result.tramCam}</Text>
      <Text variant={'body_large_regular'}>Tự hại: {result.tuHai}</Text>
      <Text variant={'body_large_regular'} textAlign={'center'} pt={4}>
        {typeResult === 'bad'
          ? 'Với những vấn đề bạn đang gặp phải, Vietmind khuyên bạn nên tham khảo ý kiến của chuyên gia tư vấn'
          : 'Sức khoẻ tâm lý tốt, bạn hãy cố gắng phát huy bằng cách xem thêm các bài đọc, video hướng dẫn hoặc sử dụng dịch vụ Tư vấn 24/7 để hiểu thêm về sức khỏe tâm lý nhé!'}
      </Text>
    </CusImageBackground>
  );
};

export default QuizResult;
