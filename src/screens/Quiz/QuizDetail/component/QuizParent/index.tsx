import React from 'react'
import {Button, Center, Text, VStack} from 'native-base'

type QuizParentProps = {
  question: string
  isLasted?: boolean
  save: (s: any) => void
}
const QuizParent: React.FC<QuizParentProps> = (props) => {
  const {question, isLasted, save} = props
  return (
    <VStack w={'full'} h={'100%'}>
      <Center w={'full'} flex={1} pb={'40px'}>
        <Text variant={'sf_header_3'} textAlign={'center'}>
          {question}
        </Text>
      </Center>
      <Button w={'full'} variant={'cusPrimary'} onPress={() => save(null)}>
        {isLasted ? 'Kết thúc' : 'Tiếp tục'}
      </Button>
    </VStack>
  )
}

export default QuizParent
