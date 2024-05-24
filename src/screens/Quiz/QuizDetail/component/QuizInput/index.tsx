import React, {useState} from 'react';
import {Button, Center, Input, Text, TextArea, VStack} from 'native-base';

type QuizInputProps = {
  question: string;
  isLasted?: boolean;
  save: (s: any) => void;
  answer: null | string;
};
const QuizInput: React.FC<QuizInputProps> = props => {
  const {question, isLasted, save, answer} = props;
  const [inputValue, setInputValue] = useState(answer ?? undefined);
  return (
    <VStack
      bgColor={'white'}
      px={'16px'}
      w={'full'}
      space={2}
      h={'100%'}
      alignItems={'center'}>
      <Text variant={'sf_header_3'} textAlign={'center'}>
        {question}
      </Text>
      <Text variant={'body_medium_regular'} my={4}>
        Question description
      </Text>
      <TextArea
        autoCompleteType
        onChangeText={e => setInputValue(e)}
        defaultValue={answer ?? undefined}
        placeholder="Nhập câu trả lời của bạn ở đây"
      />
      <Button
        mt={2}
        w={'full'}
        variant={'cusPrimary'}
        position={'absolute'}
        bottom={'128px'}
        onPress={() => save(inputValue)}
        disabled={!inputValue}>
        {isLasted ? 'Kết thúc' : 'Câu tiếp theo'}
      </Button>
    </VStack>
  );
};

export default QuizInput;