import HeaderBack from '@components/layout/HeaderBack'
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
import {tQuestionResponse} from '@hooks/question/question.interface'
import {TInfSurvey} from '@hooks/survey'

interface SurveyDetailReviewProps {
  surveyInf: TInfSurvey
  latestDetailSurveyAnswer: tQuestionResponse[]
  setStep: (step: string) => void
  isCreatingAccount: boolean | undefined
}

const groupQuestions = (data: tQuestionResponse[]) => {
  const parentQuestions = data.filter((q) => q.parentQuestionId === null)
  const childQuestions = data.filter((q) => q.parentQuestionId !== null)

  const grouped = parentQuestions.map((parent) => {
    return {
      ...parent,
      children: childQuestions.filter(
        (child) => child.parentQuestionId === parent.questionId,
      ),
    }
  })

  return grouped
}
const SurveyDetailReview: React.FC<SurveyDetailReviewProps> = ({
  surveyInf,
  latestDetailSurveyAnswer,
  setStep,
  isCreatingAccount,
}) => {
  const groupedQuestions = groupQuestions(latestDetailSurveyAnswer)
  //   latestDetailSurveyAnswer.map((answer) => {})
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
        <Box pt={'12px'} mx={2}>
          <Button variant={'cusPrimary'} onPress={() => setStep('answering')}>
            <Text variant={'body_medium_bold'}>Làm lại</Text>
          </Button>
        </Box>
      }>
      <ScrollView flex={1}>
        <Text variant={'sf_header_3'} textAlign={'center'} py={'20px'}>
          Đánh giá mức độ {normalizeText(surveyInf.title)}
        </Text>
        {groupedQuestions.map((answer, index) => {
          return (
            <VStack space={2} pb={'12px'} key={answer.questionId.toString()}>
              <Text variant={'body_medium_bold'}>
                {answer.responseFormat === 'parent_question' ? (
                  <Text
                    variant={'body_medium_regular'}
                    color={'text.neutral_secondary'}>
                    {answer.questionText}
                  </Text>
                ) : (
                  `Câu ${index + 1}`
                )}
              </Text>
              {answer.responseFormat !== 'parent_question' && (
                <Text
                  variant={'body_medium_regular'}
                  color={'text.neutral_secondary'}>
                  {answer.questionText}
                </Text>
              )}
              {answer.responseFormat !== 'parent_question' && (
                <Text>
                  <Text style={{fontWeight: 600}}>Câu trả lời: </Text>
                  {answer.responseFormat === 'single_choice'
                    ? answer.options.find((v) => v.optionId === answer.answer)
                        ?.optionText
                    : answer.answer}
                </Text>
              )}
              {answer.children.map((child, cIndex) => {
                return (
                  <VStack
                    space={2}
                    pb={'12px'}
                    key={child.questionId.toString()}>
                    <Text variant={'body_medium_bold'}>
                      {`${index + 1}.${cIndex + 1}`}{' '}
                      <Text
                        color={'text.neutral_secondary'}
                        style={{fontWeight: 400}}>
                        {child.questionText}
                      </Text>
                    </Text>

                    {child.responseFormat !== 'parent_question' && (
                      <Text>
                        <Text style={{fontWeight: 600}}>Câu trả lời: </Text>
                        {child.responseFormat === 'single_choice'
                          ? child.options.find(
                              (v) => v.optionId === child.answer,
                            )?.optionText
                          : child.answer}
                      </Text>
                    )}
                  </VStack>
                )
              })}
              <Divider bgColor={'primary.medium'} />
            </VStack>
          )
        })}
      </ScrollView>
    </HeaderBack>
  )
}

export default SurveyDetailReview
