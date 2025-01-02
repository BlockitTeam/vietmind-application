import React, {useState} from 'react'
import {Box, Button, Center, Input, Text, TextArea, VStack} from 'native-base'
import {tListResultItem} from '@screens/HomeTab/Profile/ProfileMultipleChoice/components/SurveyDetail_Answer'
import TextParent from '../TextParent'
import {Keyboard, Platform, TouchableWithoutFeedback} from 'react-native'

type QuizInputProps = {
  parentQuestion?: tListResultItem
  question: string
  isLasted?: boolean
  save: (s: any) => void
  answer: null | string
}
const QuizInput: React.FC<QuizInputProps> = (props) => {
  const {parentQuestion, question, isLasted, save, answer} = props
  const [inputValue, setInputValue] = useState(answer ?? undefined)

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <VStack
        w={'full'}
        h={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        pt={'5%'}>
        <VStack w={'full'} flex={1}>
          {parentQuestion ? (
            <TextParent title={parentQuestion.questionText} />
          ) : null}
          <VStack pb={'24px'} alignItems={'flex-start'}>
            <Text w={'100%'} variant={'sf_header_3'} textAlign={'center'}>
              {question}
            </Text>
          </VStack>
          <TextArea
            autoCompleteType
            onChangeText={(e) => setInputValue(e)}
            defaultValue={answer ?? undefined}
            placeholder="Nhập câu trả lời của bạn ở đây"
          />
        </VStack>
        <Button
          w={'full'}
          variant={'cusPrimary'}
          // position={'absolute'}
          onPress={() => save(inputValue)}
          disabled={!inputValue}>
          {isLasted ? 'Kết thúc' : 'Câu tiếp theo'}
        </Button>
      </VStack>
    </TouchableWithoutFeedback>
  )
}

export default QuizInput
