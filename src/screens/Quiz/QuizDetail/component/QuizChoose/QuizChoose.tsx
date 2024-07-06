import React from 'react';
import {Button, Center, Text, VStack} from 'native-base';
import {tOptionsOfQuestion} from '@hooks/question/question.interface';
type QuizChooseProps = {
  question: string;
  options?: tOptionsOfQuestion[];
  save: (s: number) => void;
  answer: null | number;
};
const QuizChoose: React.FC<QuizChooseProps> = props => {
  const {question, options, save, answer} = props;
  return (
    <VStack bgColor={'white'} w={'full'} space={2}>
      <Center height={'240px'}>
        <Text
          variant={'sf_header_3'}
          mb={6}
          textAlign={'center'}
          alignSelf={'center'}>
          {question}
        </Text>
      </Center>
      {options?.map(item => {
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
        );
      })}
    </VStack>
  );
};

export default QuizChoose;
