import {Button, Text, VStack} from 'native-base'
import {IBottomParamList, IRootStackParamList} from '@routes/navigator'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {CompositeScreenProps} from '@react-navigation/native'
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import HeaderBack from '@components/layout/HeaderBack'
import {useAtom} from 'jotai'
import {curUserAtom} from '@services/jotaiStorage/curUserAtom'
import {resultCommonFilterAtom} from '@services/jotaiStorage/resltCommonFilter'
import {useGetInfSurveyById} from '@hooks/survey'
import {normalizeText} from 'src/utils/textUtil'
import {Platform} from 'react-native'

type QuizResultProps = CompositeScreenProps<
  NativeStackScreenProps<IRootStackParamList, 'QuizResult'>,
  BottomTabScreenProps<IBottomParamList, 'Home'>
>

const QuizResult: React.FC<QuizResultProps> = (props) => {
  // Check force curUser
  const [curUser] = useAtom(curUserAtom)
  const {navigation} = props
  const [resultCommonFilter] = useAtom(resultCommonFilterAtom)

  const {data: surveyInfo, isLoading} = useGetInfSurveyById(
    curUser?.surveyDetail || '1',
  )
  const isDoneSurveyDetail =
    curUser?.surveyDetail && curUser.latestSpecializedVersion
  const isGoodType = curUser?.surveyDetail === null
  // if (!resultCommonFilter && isDoneSurveyDetail && !isGoodType) {
  //   navigation.replace('BottomTab', {screen: 'Home'});
  //   return null;
  // }
  if (isLoading || !curUser) return null
  return (
    <HeaderBack
      withBackGround={true}
      title="Kết quả trắc nghiệm"
      bottomChildren={
        (resultCommonFilter?.type === 'bad' || !isDoneSurveyDetail) &&
        !isGoodType ? (
          <VStack space={2} w="full">
            {surveyInfo && (
              <Button
                variant={'cusPrimary'}
                w={'full'}
                mb={Platform.OS === 'ios' ? 8 : 0}
                onPress={() =>
                  navigation.replace('SurveyDetail', {
                    infSurvey: surveyInfo.data,
                    isCreatingAccount: true,
                  })
                }>
                Tiếp tục Sàng lọc chuyên sâu
              </Button>
            )}
          </VStack>
        ) : (
          //Good
          <VStack space={2} w="full">
            <Button
              w={'full'}
              variant={'cusPrimary'}
              onPress={() => {
                // navigation.replace('BottomTab', {screen: 'Home'});
                // toast.show({title: 'Tính năng đang được cập nhật <3'});
                navigation.replace('SetTimeAppointment')
              }}>
              Chat với chuyên gia
            </Button>
            <Button
              variant={'cusOutline'}
              w={'full'}
              onPress={() => navigation.replace('BottomTab', {screen: 'Home'})}>
              Về trang chủ
            </Button>
          </VStack>
        )
      }>
      <VStack alignItems={'center'} justifyContent={'center'} h={'100%'}>
        {(resultCommonFilter?.type === 'bad' || !isDoneSurveyDetail) &&
        !isGoodType ? (
          // !surveyInfo?.data ? (
          //   <Spinner />
          // ) : (
          <>
            <Text variant={'header_1'} pt={'12.5%'} pb={4}>
              Sàng lọc chuyên sâu
            </Text>
            <Text variant={'body_large_regular'} textAlign={'center'} pt={4}>
              Dựa vào kết quả của Sàng lọc chung, bạn sẽ tiếp tục trả lời{' '}
              <Text fontWeight={'bold'}>
                {surveyInfo?.data.questionCount} câu
              </Text>{' '}
              Sàng lọc chuyên sâu về chủ để{' '}
              <Text fontWeight={'bold'}>
                {normalizeText(surveyInfo?.data.title ?? '')}
              </Text>
              .
            </Text>
          </>
        ) : (
          // )
          <>
            <Text variant={'header_1'} pt={'12.5%'} pb={4}>
              Kết quả
            </Text>
            <Text variant={'body_large_regular'} textAlign={'center'} pt={4}>
              Sức khoẻ tâm lý tốt. Bạn vẫn có thể sử dụng dịch vụ Tư vấn 24/7 để
              hiểu thêm về sức khỏe tâm lý của mình nhé!
            </Text>
          </>
        )}
      </VStack>
    </HeaderBack>
  )
}

export default QuizResult
