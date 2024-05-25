import React, {useState} from 'react';
import {Center, ChevronLeftIcon, HStack, Text, VStack} from 'native-base';
import QuizChoose from './component/QuizChoose/QuizChoose';
import QuizInput from './component/QuizInput';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@routes/navigator';

const listQuiz = [
  {
    numberKey: 0,
    question: 'Ít hứng thú hoặc là không có niềm vui thích làm việc gì',
    typeQ: 'choose',
    options: [
      {
        value: 'no',
        label: 'Không lần nào cả',
      },
      {
        value: 'few',
        label: 'Một vài ngày',
      },
      {
        value: 'half',
        label: 'Nhiều hơn phân nữa số thời gian',
      },
      {
        value: 'allDay',
        label: 'Gần như mỗi ngày',
      },
    ],
    answer: null,
  },
  {
    numberKey: 1,
    question: 'Miêu tả cảm xúc của bạn khi gặp người yêu cũ?',
    typeQ: 'input',
    answer: null,
  },
  {
    numberKey: 2,
    typeQ: 'input',
    question: 'Miêu tả cảm xúc của bạn khi chơi game thua?',
    answer: null,
  },
  {
    numberKey: 3,
    question: 'Bạn có hay ra ngoài, tụ tập với bạn bè?',
    typeQ: 'choose',
    options: [
      {
        value: 'no',
        label: 'Không lần nào cả',
      },
      {
        value: 'few',
        label: 'Một vài ngày',
      },
      {
        value: 'half',
        label: 'Nhiều hơn phân nữa số thời gian',
      },
      {
        value: 'allDay',
        label: 'Gần như mỗi ngày',
      },
    ],
    answer: null,
  },
  {
    numberKey: 4,
    typeQ: 'input',
    question: 'Miêu tả cảm xúc của bạn khi nhắn tin với một người bạn thích?',
    answer: null,
  },
];
type QuizDetailProps = NativeStackScreenProps<
  IRootStackParamList,
  'QuizDetail'
>;

const QuizDetail: React.FC<QuizDetailProps> = props => {
  const {navigation} = props;
  const nListQuest = listQuiz.length;
  const [curQuiz, setCurQuiz] = useState(listQuiz[0]);
  const [listResult, setListResult] = useState(listQuiz);
  const saveAndNext = (answer: any) => {
    const quizItem = listResult.find(
      item => item.numberKey === curQuiz.numberKey,
    );

    if (quizItem) {
      if (quizItem.numberKey === nListQuest - 1) {
        //Call api answer and get result

        navigation.navigate('QuizResult', {
          result: {loAu: 1, stress: 0, tramCam: 1.2, tuHai: 0.2},
          typeResult: 'good',
        });
      } else {
        quizItem.answer = answer;
        setCurQuiz(listResult[quizItem.numberKey + 1]);
        setListResult([...listResult]);
      }
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <HStack
        alignItems={'center'}
        justifyContent={'center'}
        bgColor={'primary.medium50'}
        py={4}
        px={2}
        position={'relative'}
        fontSize={12}>
        <TouchableOpacity
          style={{position: 'absolute', left: 8}}
          disabled={curQuiz?.numberKey === 0}
          onPress={() => setCurQuiz(listResult[curQuiz.numberKey - 1])}>
          <Center flexDir={'row'}>
            <ChevronLeftIcon />

            <Text>Quay lại</Text>
          </Center>
        </TouchableOpacity>
        <Text color={'text.neutral_teriary'}>
          Trắc nghiệm tâm lý {curQuiz.numberKey + 1}/{nListQuest}
        </Text>
      </HStack>
      <VStack
        h={'full'}
        bg={'white'}
        justifyContent={'center'}
        pt={'20px'}
        alignItems={'center'}>
        {curQuiz.typeQ === 'choose' ? (
          <QuizChoose
            key={curQuiz.numberKey}
            answer={curQuiz.answer}
            question={curQuiz.question}
            options={curQuiz.options}
            save={saveAndNext}
          />
        ) : curQuiz.typeQ === 'input' ? (
          <QuizInput
            key={curQuiz.numberKey}
            answer={curQuiz.answer}
            question={curQuiz.question}
            isLasted={curQuiz.numberKey === nListQuest}
            save={saveAndNext}
          />
        ) : null}
      </VStack>
    </SafeAreaView>
  );
};

export default QuizDetail;
