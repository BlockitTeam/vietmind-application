import HeaderBack from '@components/layout/HeaderBack'
import {tQuestionResponse} from '@hooks/question/question.interface'
import {Center, ChevronLeftIcon, HStack, Text, VStack} from 'native-base'
import React, {useEffect, useLayoutEffect, useState} from 'react'

import {useNavigation} from '@react-navigation/native'
import QuizChoose from '@screens/Quiz/QuizDetail/component/QuizChoose/QuizChoose'
import QuizInput from '@screens/Quiz/QuizDetail/component/QuizInput'
import QuizParent from '@screens/Quiz/QuizDetail/component/QuizParent'
import {useSaveDetailSurvey} from '@hooks/question/detail-survey'
import {TInfSurvey} from '@hooks/survey'
import LoadingOverlay from '@components/LoadingOverLay'

export type tListResultItem = tQuestionResponse & {
  numberKey: number
}

type SurveyDetail_AnswerProps = {
  listQuiz: tListResultItem[]
  nListQuest: number
  submitSuccess: () => void
  surveyInf: TInfSurvey
  isCreatingAccount?: boolean
}

const SurveyDetail_Answer: React.FC<SurveyDetail_AnswerProps> = (props) => {
  const {listQuiz, nListQuest, submitSuccess, surveyInf, isCreatingAccount} =
    props

  const {mutate: saveSurveyDetail, isPending} = useSaveDetailSurvey(
    surveyInf.surveyId,
  )
  const navigation = useNavigation()
  const [curQuiz, setCurQuiz] = useState<tListResultItem>(listQuiz[0])
  const [listResult, setListResult] = useState<tListResultItem[]>(listQuiz)

  // State to manage loading overlay
  const [isLoading, setIsLoading] = useState(false)

  const saveAndNext = async (answer: any) => {
    if (curQuiz && nListQuest) {
      const quizItem = listResult[curQuiz.numberKey]

      if (quizItem) {
        // Update list result
        console.log('save and next', quizItem.numberKey, nListQuest - 1)
        quizItem.answer = answer
        if (quizItem.numberKey === nListQuest - 1) {
          console.log('summit ne')

          // Start loading overlay
          setIsLoading(true)

          await saveSurveyDetail([...listResult], {
            onSuccess: async (rs) => {
              console.log('submit success: ')
              await submitSuccess()
              setIsLoading(false)
            },
            onError: (error) => {
              console.log('Error while saving: ', error)
              setIsLoading(false)
            },
          })
        } else {
          setCurQuiz(listResult[quizItem.numberKey + 1])
          setListResult([...listResult])
        }
      }
    }
  }

  const [curParentQuiz, setCurParentQuiz] = useState<
    tListResultItem | undefined
  >()

  useLayoutEffect(() => {
    if (!curQuiz.parentQuestionId) {
      // No parent question -> clear
      setCurParentQuiz(undefined)
    } else {
      // Find parent question by ID
      const temp = listResult.find(
        (q) => q.questionId === curQuiz.parentQuestionId,
      )
      setCurParentQuiz(temp)
    }
  }, [curQuiz])

  return (
    <>
      {(isLoading || isPending) && <LoadingOverlay />}

      <HeaderBack
        title={`Trắc nghiệm ${surveyInf.title} ${
          curQuiz.numberKey + 1
        }/${nListQuest}`}
        buttonBack={
          curQuiz.numberKey === 0 && isCreatingAccount ? undefined : (
            <HStack>
              <ChevronLeftIcon />
              <Text variant={'caption_regular'} color={'neutral.primary'}>
                {curQuiz.numberKey === 0 && ' Quay lại'}
              </Text>
            </HStack>
          )
        }
        buttonBackPress={() => {
          if (curQuiz.numberKey === 0) {
            navigation.goBack()
          } else {
            setCurQuiz(listResult[curQuiz.numberKey - 1])
          }
        }}>
        <Center h="full">
          {curQuiz.responseFormat === 'text_input' ? (
            <QuizInput
              parentQuestion={curParentQuiz}
              key={curQuiz.numberKey}
              answer={curQuiz.answer ? curQuiz.answer.toString() : null}
              question={curQuiz.questionText}
              save={saveAndNext}
            />
          ) : curQuiz.responseFormat === 'parent_question' ? (
            <QuizParent
              key={curQuiz.numberKey}
              question={curQuiz.questionText}
              save={saveAndNext}
            />
          ) : (
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
          )}
        </Center>
      </HeaderBack>
    </>
  )
}

export default SurveyDetail_Answer
