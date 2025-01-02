import React from 'react'
import {Button, Center, Text, VStack} from 'native-base'
import {tOptionsOfQuestion} from '@hooks/question/question.interface'
import {tListResultItem} from '@screens/HomeTab/Profile/ProfileMultipleChoice/components/SurveyDetail_Answer'
import TextParent from '../TextParent'
type QuizChooseProps = {
  parentQuestion?: tListResultItem
  question: string
  options?: tOptionsOfQuestion[]
  save: (s: number) => void
  answer: null | number
}
const QuizChoose: React.FC<QuizChooseProps> = (props) => {
  const {question, parentQuestion, options, save, answer} = props

  return (
    <VStack bgColor={'white'} w={'full'} space={2} h={'100%'} pt={'5%'}>
      {parentQuestion ? (
        <TextParent title={parentQuestion.questionText} />
      ) : null}
      <VStack minH={'50%'}>
        <Text
          variant={'sf_header_3'}
          mb={6}
          textAlign={'center'}
          alignSelf={'center'}>
          {question}
        </Text>
      </VStack>
      {options?.map((item) => {
        return (
          <Button
            key={item.optionId}
            variant={
              answer !== null && answer === item.optionId
                ? 'cusSelected'
                : 'cusOutline'
            }
            w={'full'}
            onPress={() => save(item.optionId)}>
            {item.optionText}
          </Button>
        )
      })}
    </VStack>
  )
}

export default QuizChoose
