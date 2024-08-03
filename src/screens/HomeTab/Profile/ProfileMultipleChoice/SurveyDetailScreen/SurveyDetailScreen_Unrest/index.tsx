import HeaderBack from '@components/layout/HeaderBack';
import {useGetUnrestSurvey} from '@hooks/question';
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

type SurveyDetailScreen_UnrestPropsStep = 'started' | 'answering' | 'answered'; //  started is not answered and show list of questions, answering is user is answering, and answered is user have done survey and  can survey again
type SurveyDetailScreen_UnrestProps = {};
const SurveyDetailScreen_Unrest: React.FC<
  SurveyDetailScreen_UnrestProps
> = () => {
  const {data: dataUnrestSurvey, isLoading: isUnrestSurveyLoading} =
    useGetUnrestSurvey();
  const [step, setStep] = useState<
    SurveyDetailScreen_UnrestPropsStep | undefined
  >(undefined);

  useEffect(() => {
    if (dataUnrestSurvey?.data) {
      if (dataUnrestSurvey?.data[0]?.answer) setStep('answered');
      else setStep('started');
    }
  }, [dataUnrestSurvey?.data]);
  if (!dataUnrestSurvey?.data || isUnrestSurveyLoading || !step)
    return <Splash />;

  if (step === 'started')
    return (
      <HeaderBack
        title={`Trắc nghiệm / Lo âu`}
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
            Đánh giá mức độ lo âu
          </Text>
          {dataUnrestSurvey?.data.map((unrest, index) => {
            return (
              <VStack space={2} pb={'12px'} key={unrest.questionId}>
                <Text variant={'body_medium_bold'}>Câu {index + 1}</Text>
                <Text
                  variant={'body_medium_regular'}
                  color={'text.neutral_secondary'}>
                  {unrest.questionText}
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
        listQuiz={dataUnrestSurvey.data.map((item, index) => {
          return {...item, numberKey: index};
        })}
        nListQuest={dataUnrestSurvey.data.length}></SurveyDetail_Answer>
    );
  return <></>;
};

export default SurveyDetailScreen_Unrest;
