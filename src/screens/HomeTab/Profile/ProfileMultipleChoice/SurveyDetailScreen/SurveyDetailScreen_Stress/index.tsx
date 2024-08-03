import HeaderBack from '@components/layout/HeaderBack';
import {useGetStressSurvey} from '@hooks/question';
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

type SurveyDetailScreen_StressPropsStep = 'started' | 'answering' | 'answered'; //  started is not answered and show list of questions, answering is user is answering, and answered is user have done survey and  can survey again
type SurveyDetailScreen_StressProps = {};
const SurveyDetailScreen_Stress: React.FC<
  SurveyDetailScreen_StressProps
> = () => {
  const {data: dataStressSurvey, isLoading: isStressSurveyLoading} =
    useGetStressSurvey();
  const [step, setStep] = useState<
    SurveyDetailScreen_StressPropsStep | undefined
  >(undefined);

  useEffect(() => {
    if (dataStressSurvey?.data) {
      if (dataStressSurvey?.data[0]?.answer) setStep('answered');
      else setStep('started');
    }
  }, [dataStressSurvey?.data]);
  if (!dataStressSurvey?.data || isStressSurveyLoading || !step)
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
          {dataStressSurvey?.data.map((stress, index) => {
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
        listQuiz={dataStressSurvey.data.map((item, index) => {
          return {...item, numberKey: index};
        })}
        nListQuest={dataStressSurvey.data.length}
      />
    );
  return <></>;
};

export default SurveyDetailScreen_Stress;
