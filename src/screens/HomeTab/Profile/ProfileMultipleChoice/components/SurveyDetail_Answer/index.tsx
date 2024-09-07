import HeaderBack from '@components/layout/HeaderBack';
import {tQuestionResponse} from '@hooks/question/question.interface';
import {Center, ChevronLeftIcon, Text} from 'native-base';
import React, {useEffect, useLayoutEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import QuizChoose from '@screens/Quiz/QuizDetail/component/QuizChoose/QuizChoose';
import QuizInput from '@screens/Quiz/QuizDetail/component/QuizInput';
import QuizParent from '@screens/Quiz/QuizDetail/component/QuizParent';

export type tListResultItem = tQuestionResponse & {
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

  const [curParentQuiz, setCurParentQuiz] = useState<
    tListResultItem | undefined
  >();
  useLayoutEffect(() => {
    if (!curQuiz.parentQuestionId) {
      //have no parent question -> clear
      setCurParentQuiz(undefined);
    } else {
      // have parent -> find parent by id
      const temp = listResult.find(
        q => q.questionId === curQuiz.parentQuestionId,
      );
      console.log(temp);
      setCurParentQuiz(temp);
    }
  }, [curQuiz]);
  // console.log(curQuiz, curParentQuiz);
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
        {
          curQuiz.responseFormat === 'text_input' ? (
            <QuizInput
              parentQuestion={curParentQuiz}
              key={curQuiz.numberKey}
              answer={curQuiz.answer ? curQuiz.answer.toString() : null}
              question={curQuiz.questionText}
              save={saveAndNext}
            />
          ) : curQuiz.responseFormat === 'parent_question' ? (
            //Parent question, just question text
            <QuizParent
              key={curQuiz.numberKey}
              question={curQuiz.questionText}
              save={saveAndNext}
            />
          ) : (
            //Response format have undefined -> single_choice
            // curQuiz.responseFormat === 'single_choice' :
            <QuizChoose
              parentQuestion={curParentQuiz}
              key={curQuiz.numberKey}
              answer={
                curQuiz.answer === null
                  ? null
                  : parseInt(curQuiz.answer.toString())
              }
              question={curQuiz.questionText}
              options={curQuiz.options}
              save={saveAndNext}
            />
          )
          //  : ( //   <Text>Not handle {curQuiz.responseFormat + ''}</Text> // )
        }
      </Center>
    </HeaderBack>
  );
};

export default SurveyDetail_Answer;
