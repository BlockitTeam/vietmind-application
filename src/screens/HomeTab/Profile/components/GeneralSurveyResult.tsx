import HeaderBack from '@components/layout/HeaderBack'
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import {CompositeScreenProps} from '@react-navigation/native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {IBottomParamList, IRootStackParamList} from '@routes/navigator'
import {
  Box,
  Button,
  ChevronLeftIcon,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import React from 'react'
import {normalizeText} from 'src/utils/textUtil'

type tGeneralSurveyResultProps = CompositeScreenProps<
  NativeStackScreenProps<IRootStackParamList, 'GeneralSurveyResult'>,
  BottomTabScreenProps<IBottomParamList, 'Profile'>
>

const GeneralSurveyResult: React.FC<tGeneralSurveyResultProps> = (props) => {
  const {navigation, route} = props
  const title = route.params.title
  const rs = route.params.res
  return (
    <HeaderBack
      title={`Trắc nghiệm / ${title}`}
      buttonBack={
        <HStack alignItems={'center'} space={'2px'}>
          <ChevronLeftIcon />
          <Text variant={'caption_regular'} color={'neutral.primary'}>
            Thoát
          </Text>
        </HStack>
      }>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <Text variant={'sf_header_3'} textAlign={'center'} py={'20px'}>
          Đánh giá mức độ {normalizeText(title)}
        </Text>
        {rs?.map((answer, index) => {
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
                  answer.options.find((v) => v.optionId === answer.answer)
                    ?.optionText
                }
              </Text>

              <Divider bgColor={'primary.medium'} />
            </VStack>
          )
        })}
      </ScrollView>
    </HeaderBack>
  )
}

export default GeneralSurveyResult
