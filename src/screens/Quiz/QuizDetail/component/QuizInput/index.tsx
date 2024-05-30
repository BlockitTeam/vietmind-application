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
    <VStack w={'full'} h={'100%'} alignItems={'center'}>
      <VStack w={'full'} flex={1}>
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
      </VStack>
      <Button
        w={'full'}
        variant={'cusPrimary'}
        // position={'absolute'}
        bottom={'24px'}
        onPress={() => save(inputValue)}
        disabled={!inputValue}>
        {isLasted ? 'Kết thúc' : 'Câu tiếp theo'}
      </Button>
    </VStack>
  );
};

export default QuizInput;
