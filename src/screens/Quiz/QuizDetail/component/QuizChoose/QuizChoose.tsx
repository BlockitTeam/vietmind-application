import React from 'react';
import {Button, Center, Text, VStack} from 'native-base';
type QuizChooseProps = {
  question: string;
  options?: {label: string; value: string}[];
  save: (s: string) => void;
  answer: null | string;
};
const QuizChoose: React.FC<QuizChooseProps> = props => {
  const {question, options, save, answer} = props;
  return (
    <VStack bgColor={'white'} px={'16px'} w={'full'} space={2} pb={'12.5%'}>
      <Text variant={'sf_header_3'} mb={6} textAlign={'center'} pb={10}>
        {question}
      </Text>
      {options?.map(item => {
        return (
          <Button
            key={item.value}
            variant={
              answer !== null && answer === item.value
                ? 'cusSelected'
                : 'cusOutline'
            }
            w={'full'}
            onPress={() => save(item.value)}>
            {item.label}
          </Button>
        );
      })}
    </VStack>
  );
};

export default QuizChoose;
