import React, {useState} from 'react';
import {Center, ChevronLeftIcon} from 'native-base';
import HeaderBack from '@components/layout/HeaderBack';
import {tQuestionResponse} from '@hooks/question/question.interface';

import QuizChoose from '@screens/Quiz/QuizDetail/component/QuizChoose/QuizChoose';
import {navigate} from 'App';
import {useNavigation} from '@react-navigation/native';

type tListResultItem = tQuestionResponse & {
  numberKey: number;
};
type SurveyDetail_AnswerProps = {
  listQuiz: tListResultItem[];
  nListQuest: number;
};
const SurveyDetail_Answer: React.FC<SurveyDetail_AnswerProps> = props => {
  const {listQuiz, nListQuest} = props;
  // const [curUser, setCurUser] = useAtom(curUserAtom);
  // const [_, setResultCommonFilter] = useAtom(resultCommonFilterAtom);
  const navigation = useNavigation();
  const [curQuiz, setCurQuiz] = useState<tListResultItem>(listQuiz[0]);
  const [listResult, setListResult] = useState<tListResultItem[]>(listQuiz);
  console.log(curQuiz);
  const saveAndNext = (answer: any) => {
    if (curQuiz && nListQuest) {
      const quizItem = listResult[curQuiz.numberKey];
      if (quizItem) {
        //update list result
        quizItem.answer = answer;

        if (quizItem.numberKey === nListQuest - 1) {
          // useSaveSurveyResponseMutation.mutate([...listResult], {
          //   onSuccess: rs => {
          //     refetch().then(result => {
          //       if (
          //         result.data?.statusCode === 200 ||
          //         result.data?.statusCode === 201
          //       ) {
          //         // setResultCommonFilter(result.data.data);
          //         // setCurUser({
          //         //   ...curUser,
          //         //   surveyCompleted: true,
          //         // } as tUserResponse);
          //       }
          //     });
          //   },
          //   onError: error => {
          //     console.log('🚀 ~ saveAndNext ~ error:', error);
          //   },
          // });
        } else {
          setCurQuiz(listResult[quizItem.numberKey + 1]);
          setListResult([...listResult]);
        }
      }
    }
  };
  // const isLoading = isListQuestionLoading || !curQuiz || !nListQuest;
  return (
    <HeaderBack
      title={`Trắc nghiệm tâm lý ${curQuiz.numberKey + 1}/${nListQuest}`}
      buttonBack={
        <Center flexDir={'row'} alignItems={'center'} justifyContent={'center'}>
          <ChevronLeftIcon />
          {curQuiz.numberKey === 0 && ' Quay lại'}
        </Center>
      }
      buttonBackPress={() => {
        if (curQuiz.numberKey === 0) {
          navigation.goBack();
        } else setCurQuiz(listResult[curQuiz.numberKey - 1]);
      }}>
      <Center h="full">
        <QuizChoose
          key={curQuiz.numberKey}
          answer={
            curQuiz.answer === null ? null : parseInt(curQuiz.answer.toString())
          }
          question={curQuiz.questionText}
          options={curQuiz.options}
          save={saveAndNext}
        />
      </Center>
    </HeaderBack>
  );
};

export default SurveyDetail_Answer;
