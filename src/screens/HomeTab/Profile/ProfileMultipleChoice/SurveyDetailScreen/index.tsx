import HeaderBack from '@components/layout/HeaderBack'
import {useGetListQuestionById} from '@hooks/question'
import Splash from '@screens/Auth/Splash'
import {
  Box,
  Button,
  ChevronLeftIcon,
  Divider,
  HStack,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base'
import React, {useEffect, useState} from 'react'
import SurveyDetail_Answer from '../components/SurveyDetail_Answer'
import {useCurrentUser} from '@hooks/user'
import {useGetLatestDetailSurveyAnswer} from '@hooks/question/detail-survey'
import {CompositeScreenProps} from '@react-navigation/native'
import {IBottomParamList, IRootStackParamList} from '@routes/navigator'
import ErrorComponent from '@components/Error'
import {normalizeText} from 'src/utils/textUtil'
import {TOAST_PLACEMENT} from 'src/constants'
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {useAtom} from 'jotai'
import {curUserAtom} from '@services/jotaiStorage/curUserAtom'
import {Platform} from 'react-native'
import SurveyDetailReview from './SurveyDetailReview'

type TSurveyDetailScreen =
  | 'started' //  started is not answered -> show list of questions,
  | 'answering' //  answering is user is answering -> show detail answer
  | 'review' // review is user have done survey and can survey again
type SurveyDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<IRootStackParamList, 'SurveyDetail'>,
  BottomTabScreenProps<IBottomParamList, 'Home'>
>

const SurveyDetailScreen: React.FC<SurveyDetailScreenProps> = (props) => {
  const {navigation, route} = props
  // const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const toast = useToast()
  // const route = useRoute<SurveyDetailRouteProp>();
  const surveyInf = route.params.infSurvey
  const isCreatingAccount = route.params.isCreatingAccount
  const {data: dataSurvey, isLoading: isSurveyLoading} = useGetListQuestionById(
    surveyInf.surveyId,
  )

  const [, setCurUser] = useAtom(curUserAtom)
  const [step, setStep] = useState<TSurveyDetailScreen | undefined>(undefined)

  const {data: currentUser, refetch: rfCurUser} = useCurrentUser()
  const {
    data: latestDetailSurveyAnswer,
    isLoading: isLatestDetailSurveyAnswer,
    refetch: refetchLatestDetailSurveyAnswer,
    error: isSurveyError,
  } = useGetLatestDetailSurveyAnswer()
  useEffect(() => {
    if (
      latestDetailSurveyAnswer?.data &&
      currentUser?.data.latestSpecializedVersion !== null
    ) {
      setStep('review')
    } else setStep('started')
  }, [latestDetailSurveyAnswer?.data, currentUser?.data])

  const submitSuccess = async () => {
    if (isCreatingAccount) {
      // const {data: rfData} = await rfCurUser();
      rfCurUser().then((rfData) => {
        if (rfData && rfData?.data) {
          setCurUser(rfData?.data.data)
          navigation.replace('DetailResult')
        }
      })
    } else {
      await refetchLatestDetailSurveyAnswer()
      setStep('review')
    }

    toast.show({
      title: 'Đánh giá thành công!',
      duration: 2000,
      placement: TOAST_PLACEMENT,
    })
  }
  if (
    isSurveyLoading ||
    isLatestDetailSurveyAnswer ||
    !dataSurvey?.data ||
    !step
  )
    return <Splash />

  if (isSurveyError)
    return (
      <ErrorComponent
        title="Lỗi khi tải dữ liệu, vui lòng thử lại."
        refetchCallback={() => refetchLatestDetailSurveyAnswer()}
      />
    )
  if (step === 'review') {
    return latestDetailSurveyAnswer?.data ? (
      <SurveyDetailReview
        surveyInf={surveyInf}
        latestDetailSurveyAnswer={latestDetailSurveyAnswer?.data}
        setStep={() => setStep('answering')}
        isCreatingAccount={isCreatingAccount}
      />
    ) : null
  } else if (step === 'started')
    return (
      <HeaderBack
        title={`Trắc nghiệm / ${surveyInf.title}`}
        buttonBack={
          !isCreatingAccount ? (
            <HStack alignItems={'center'} space={'2px'}>
              <ChevronLeftIcon />
              <Text variant={'caption_regular'} color={'neutral.primary'}>
                Thoát
              </Text>
            </HStack>
          ) : undefined
        }
        bottomChildren={
          <Box pt={4}>
            <Button
              variant={'cusPrimary'}
              onPress={() => setStep('answering')}
              mb={Platform.OS === 'ios' ? 6 : 0}>
              <Text variant={'body_medium_bold'}>Bắt đầu</Text>
            </Button>
          </Box>
        }>
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
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
            )
          })}
        </ScrollView>
      </HeaderBack>
    )
  else if (step === 'answering')
    return (
      <SurveyDetail_Answer
        isCreatingAccount={isCreatingAccount}
        surveyInf={surveyInf}
        submitSuccess={() => submitSuccess()}
        listQuiz={dataSurvey.data.map((item, index) => {
          return {...item, numberKey: index}
        })}
        nListQuest={dataSurvey.data.length}
      />
    )

  return <></>
}

export default SurveyDetailScreen
