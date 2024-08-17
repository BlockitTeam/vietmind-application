import HeaderBack from '@components/layout/HeaderBack';
import {useGetDepressionSurvey} from '@hooks/question';
import Splash from '@screens/Auth/Splash';
import {
  Box,
  Button,
  ChevronLeftIcon,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import SurveyDetail_Answer from '../../components/SurveyDetail_Answer';

type SurveyDetailScreen_DepressionPropsStep =
  | 'started'
  | 'answering'
  | 'answered'; //  started is not answered and show list of questions, answering is user is answering, and answered is user have done survey and  can survey again
type SurveyDetailScreen_DepressionProps = {};
const SurveyDetailScreen_Depression: React.FC<
  SurveyDetailScreen_DepressionProps
> = () => {
  const {data: dataDepressionSurvey, isLoading: isDepressionSurveyLoading} =
    useGetDepressionSurvey();
  const [step, setStep] = useState<
    SurveyDetailScreen_DepressionPropsStep | undefined
  >(undefined);

  useEffect(() => {
    if (dataDepressionSurvey?.data) {
      if (dataDepressionSurvey?.data[0]?.answer) setStep('answered');
      else setStep('started');
    }
  }, [dataDepressionSurvey?.data]);
  if (!dataDepressionSurvey?.data || isDepressionSurveyLoading || !step)
    return <Splash />;

  if (step === 'started')
    return (
      <HeaderBack
        title={`Trắc nghiệm / Trầm cảm`}
        buttonBack={
          <HStack alignItems={'center'} space={'2px'}>
            <ChevronLeftIcon />
            <Text color={'neutral.primary'}>Thoát</Text>
          </HStack>
        }
        bottomChildren={
          <Box pt={'12px'}>
            <Button variant={'cusPrimary'} onPress={() => setStep('answering')}>
              <Text variant={'body_medium_bold'}>Bắt đầu</Text>
            </Button>
          </Box>
        }>
        <ScrollView flex={1}>
          <Text variant={'sf_header_3'} textAlign={'center'} py={'20px'}>
            Đánh giá mức độ trầm cảm
          </Text>
          {dataDepressionSurvey?.data.map((stress, index) => {
            return (
              <VStack space={2} pb={'12px'} key={stress.questionId}>
                <Text variant={'body_medium_bold'}>Câu {index + 1}</Text>
                <Text
                  variant={'body_medium_regular'}
                  color={'text.neutral_secondary'}>
                  {stress.questionText}
                </Text>
                <Divider bgColor={'primary.medium'} />
              </VStack>
            );
          })}
        </ScrollView>
      </HeaderBack>
    );
  else if (step === 'answering')
    return (
      <SurveyDetail_Answer
        listQuiz={dataDepressionSurvey.data.map((item, index) => {
          return {...item, numberKey: index};
        })}
        nListQuest={dataDepressionSurvey.data.length}
      />
    );
  return <></>;
};

export default SurveyDetailScreen_Depression;
