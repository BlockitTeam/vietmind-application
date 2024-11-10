import React, {useEffect, useState} from 'react';
import {
  Box,
  Center,
  ChevronLeftIcon,
  HStack,
  Skeleton,
  Spinner,
  Text,
  View,
  VStack,
} from 'native-base';
import QuizChoose from './component/QuizChoose/QuizChoose';
import QuizInput from './component/QuizInput';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@routes/navigator';
import HeaderBack from '@components/layout/HeaderBack';
import {useGetListQuestion} from '@hooks/question';
import {tQuestionResponse} from '@hooks/question/question.interface';
import {
  useGetSurveyResponseResult,
  useSaveSurveyResponse,
} from '@hooks/response';
import {useAtom} from 'jotai';
import {resultCommonFilterAtom} from '@services/jotaiStorage/resltCommonFilter';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import {tUserResponse} from '@hooks/user/user.interface';
import LoadingOverlay from '@components/LoadingOverLay';

type QuizDetailProps = NativeStackScreenProps<
  IRootStackParamList,
  'QuizDetail'
>;

type tListResultItem = tQuestionResponse & {
  numberKey: number;
};
const QuizDetail: React.FC<QuizDetailProps> = props => {
  const {navigation} = props;
  const [curUser, setCurUser] = useAtom(curUserAtom);
  const [_, setResultCommonFilter] = useAtom(resultCommonFilterAtom);

  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);
  const [nListQuest, setNListQuest] = useState<number>();
  const [curQuiz, setCurQuiz] = useState<tListResultItem>();
  const [listResult, setListResult] = useState<tListResultItem[]>([]);
  //Todo: API
  const {data: dataListQuestion, isLoading: isListQuestionLoading} =
    useGetListQuestion();
  const useSaveSurveyResponseMutation = useSaveSurveyResponse();
  const {refetch} = useGetSurveyResponseResult();
  useEffect(() => {
    if (dataListQuestion?.data) {
      const transformList: tListResultItem[] = dataListQuestion.data.map(
        (item, index) => {
          return {...item, numberKey: index};
        },
      );
      setCurQuiz(transformList[0]);
      setNListQuest(transformList.length);
      setListResult(transformList);
    }
  }, [dataListQuestion]);

  const saveAndNext = (answer: any) => {
    if (curQuiz && nListQuest) {
      const quizItem = listResult.find(
        item => item.numberKey === curQuiz.numberKey,
      );
      if (quizItem) {
        //update list result
        quizItem.answer = answer;

        setIsLoadingOverlay(true);

        if (quizItem.numberKey === nListQuest - 1) {
          useSaveSurveyResponseMutation.mutate([...listResult], {
            onSuccess: rs => {
              refetch().then(result => {
                if (
                  result.data?.statusCode === 200 ||
                  result.data?.statusCode === 201
                ) {
                  setIsLoadingOverlay(false);
                  setResultCommonFilter(result.data.data);
                  setCurUser({
                    ...curUser,
                    surveyCompleted: false,
                  } as tUserResponse);
                }
              });
            },
            onError: error => {
              setIsLoadingOverlay(false);
              console.log('🚀 ~ saveAndNext ~ error:', error);
            },
          });
        } else {
          setIsLoadingOverlay(false);
          setCurQuiz(listResult[quizItem.numberKey + 1]);
          setListResult([...listResult]);
        }
      }
    }
  };
  const isLoading = isListQuestionLoading || !curQuiz || !nListQuest;
  return (
    <>
      {isLoadingOverlay && <LoadingOverlay />}

      <HeaderBack
        title={
          isLoading
            ? 'Loading...'
            : `Trắc nghiệm tâm lý ${curQuiz.numberKey + 1}/${nListQuest}`
        }
        buttonBack={
          <TouchableOpacity
            disabled={curQuiz?.numberKey === 0}
            onPress={() =>
              !isLoading && setCurQuiz(listResult[curQuiz.numberKey - 1])
            }>
            <Center flexDir={'row'}>
              <ChevronLeftIcon />
              <Text>Quay lại</Text>
            </Center>
          </TouchableOpacity>
        }>
        <Center h="full">
          {isLoading ? (
            <>
              <Skeleton mb={2} />
              <Skeleton mb={2} />
              <Skeleton mb={2} />
              <Skeleton mb={2} />
            </>
          ) : (
            <QuizChoose
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
          )}
        </Center>
      </HeaderBack>
    </>
  );
};

export default QuizDetail;
