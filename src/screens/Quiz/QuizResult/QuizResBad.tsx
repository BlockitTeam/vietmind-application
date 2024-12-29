import HeaderBack from '@components/layout/HeaderBack';
import {useGetInfSurveyById} from '@hooks/survey';
import {tUserResponse} from '@hooks/user/user.interface';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import {resultCommonFilterAtom} from '@services/jotaiStorage/resltCommonFilter';
import {useAtom} from 'jotai';
import {Button, VStack, Text} from 'native-base';
import React from 'react';
import { Platform } from 'react-native';
import {normalizeText} from 'src/utils/textUtil';

type QuizResBadProps = {
  navigation: any;
  surveyDetail: string;
};
const QuizResBad: React.FC<QuizResBadProps> = props => {
  const {navigation, surveyDetail} = props;
  // const {navigation} = props;

  const {data: surveyInfo} = useGetInfSurveyById(surveyDetail);

  return (
    <HeaderBack
      withBackGround={true}
      title="Kết quả trắc nghiệm"
      bottomChildren={
        <VStack space={2} w="full">
          {surveyInfo && (
            <Button
              variant={'cusPrimary'}
              w={'full'}
              onPress={() =>
                navigation.replace('SurveyDetail', {
                  infSurvey: surveyInfo.data,
                  isCreatingAccount: true,
                })
              }>
              Tiếp tục sàn lọc chuyên sâu
            </Button>
          )}
        </VStack>
      }>
      <VStack alignItems={'center'} justifyContent={'center'} h={'100%'}>
        <>
          <Text variant={'header_1'} pt={'12.5%'} pb={4}>
            Sàn lọc chuyên sâu
          </Text>
          <Text variant={'body_large_regular'} textAlign={'center'} pt={4}>
            Dựa vào kết quả của sàn lọc chung, bạn sẽ tiếp tục trả lời{' '}
            <Text fontWeight={'bold'}>
              {surveyInfo?.data.questionCount} câu
            </Text>{' '}
            sàn lọc chuyên sâu về chủ để{' '}
            <Text fontWeight={'bold'}>
              {normalizeText(surveyInfo?.data.title ?? '')}
            </Text>
            .
          </Text>
        </>
      </VStack>
    </HeaderBack>
  );
};

export default QuizResBad;
