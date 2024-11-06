import HeaderBack from '@components/layout/HeaderBack';
import {useGetListQuestionById} from '@hooks/question';
import Splash from '@screens/Auth/Splash';
import {
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  Divider,
  HStack,
  ScrollView,
  Spinner,
  Text,
  useToast,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import SurveyDetail_Answer from '../components/SurveyDetail_Answer';
import {useCurrentUser} from '@hooks/user';
import {useGetLatestDetailSurveyAnswer} from '@hooks/question/detail-survey';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {IRootStackParamList} from '@routes/navigator';
import ErrorComponent from '@components/Error';
import {normalizeText} from 'src/utils/textUtil';
import {TOAST_PLACEMENT} from 'src/constants';

type SurveyDetailRouteProp = RouteProp<IRootStackParamList, 'SurveyDetail'>;

type TSurveyDetailScreen =
  | 'started' //  started is not answered -> show list of questions,
  | 'answering' //  answering is user is answering -> show detail answer
  | 'review'; // review is user have done survey and can survey again
type SurveyDetailScreenProps = {};
const SurveyDetailScreen: React.FC<SurveyDetailScreenProps> = () => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const toast = useToast();
  const route = useRoute<SurveyDetailRouteProp>();
  const surveyInf = route.params.infSurvey;
  const {data: dataSurvey, isLoading: isSurveyLoading} = useGetListQuestionById(
    surveyInf.surveyId,
  );

  const [step, setStep] = useState<TSurveyDetailScreen | undefined>(undefined);

  const {data: currentUser} = useCurrentUser();
  const {
    data: latestDetailSurveyAnswer,
    isLoading: isLatestDetailSurveyAnswer,
    refetch: refetchLatestDetailSurveyAnswer,
    error: isSurveyError,
  } = useGetLatestDetailSurveyAnswer();
  useEffect(() => {
    if (dataSurvey?.data) {
      if (currentUser?.data.surveyDetail !== null) {
        setStep('review');
        refetchLatestDetailSurveyAnswer();
      } else setStep('started');
    }
  }, [dataSurvey?.data]);

  const submitSuccess = async () => {
    await refetchLatestDetailSurveyAnswer();
    setStep('review');
    toast.show({
      title: 'Đánh giá thành công!',
      duration: 2000,
      placement: TOAST_PLACEMENT,
    });
  };
  console.log(step);
  if (
    isSurveyLoading ||
    isLatestDetailSurveyAnswer ||
    !dataSurvey?.data ||
    !step
  )
    return <Splash />;

  if (isSurveyError)
    return (
      <ErrorComponent
        title="Lỗi khi tải dữ liệu, vui lòng thử lại."
        refetchCallback={() => refetchLatestDetailSurveyAnswer()}
      />
    );
  if (step === 'review') {
    return (
      <HeaderBack
        title={`Trắc nghiệm / ${surveyInf.title}`}
        buttonBack={
          <HStack alignItems={'center'} space={'2px'}>
            <ChevronLeftIcon />
            <Text color={'neutral.primary'}>Thoát</Text>
          </HStack>
        }
        bottomChildren={
          <Box pt={'12px'}>
            <Button variant={'cusPrimary'} onPress={() => setStep('answering')}>
              <Text variant={'body_medium_bold'}>Làm lại</Text>
            </Button>
          </Box>
        }>
        <ScrollView flex={1}>
          <Text variant={'sf_header_3'} textAlign={'center'} py={'20px'}>
            Đánh giá mức độ {normalizeText(surveyInf.title)}
          </Text>
          {latestDetailSurveyAnswer?.data.map((answer, index) => {
            return (
              <VStack space={2} pb={'12px'} key={answer.questionId.toString()}>
                <Text variant={'body_medium_bold'}>Câu {index + 1}</Text>
                <Text
                  variant={'body_medium_regular'}
                  color={'text.neutral_secondary'}>
                  {answer.questionText}
                </Text>
                <Text>
                  <Text style={{fontWeight: 600}}>Câu trả lời: </Text>
                  {
                    answer.options.find(v => v.optionId === answer.answer)
                      ?.optionText
                  }
                </Text>

                <Divider bgColor={'primary.medium'} />
              </VStack>
            );
          })}
        </ScrollView>
      </HeaderBack>
    );
  } else if (step === 'started')
    return (
      <HeaderBack
        title={`Trắc nghiệm / ${surveyInf.title}`}
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
            Đánh giá mức độ {normalizeText(surveyInf.title)}
          </Text>
          {dataSurvey?.data.map((stress, index) => {
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
        surveyInf={surveyInf}
        submitSuccess={() => submitSuccess()}
        listQuiz={dataSurvey.data.map((item, index) => {
          return {...item, numberKey: index};
        })}
        nListQuest={dataSurvey.data.length}
      />
    );

  return <></>;
};

export default SurveyDetailScreen;
