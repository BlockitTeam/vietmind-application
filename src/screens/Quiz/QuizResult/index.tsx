import React, {useEffect, useState} from 'react';
import CusImageBackground from '@components/layout/CusImageBackground';
import {Button, Text, useToast, VStack} from 'native-base';
import {IBottomParamList, IRootStackParamList} from '@routes/navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import HeaderBack from '@components/layout/HeaderBack';
import {useAtom} from 'jotai';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import {resultCommonFilterAtom} from '@services/jotaiStorage/resltCommonFilter';
import LoadingOverlay from '@components/LoadingOverLay';
import {useGetInfSurveyById} from '@hooks/survey';
import {normalizeText} from 'src/utils/textUtil';

type QuizResultProps = CompositeScreenProps<
  NativeStackScreenProps<IRootStackParamList, 'QuizResult'>,
  BottomTabScreenProps<IBottomParamList, 'Home'>
>;

const QuizResult: React.FC<QuizResultProps> = props => {
  const {navigation} = props;
  const [resultCommonFilter, setResultCommonFilter] = useAtom(
    resultCommonFilterAtom,
  );
  const toast = useToast();
  const [curUser, setCurUser] = useAtom(curUserAtom);
  const {data: surveyInfo, isLoading: surveyInfoLoading} = useGetInfSurveyById(
    curUser?.surveyDetail ?? undefined,
  );
  const isDoneSurveyDetail =
    curUser?.surveyDetail && curUser.latestSpecializedVersion;
  if (!resultCommonFilter && isDoneSurveyDetail) {
    navigation.replace('BottomTab', {screen: 'Home'});
    return null;
  }

  return (
    <HeaderBack
      withBackGround={true}
      title="Kết quả trắc nghiệm"
      bottomChildren={
        resultCommonFilter?.type === 'bad' || !isDoneSurveyDetail ? (
          <VStack space={2} w="full">
            {surveyInfo && (
              <Button
                variant={'cusPrimary'}
                w={'full'}
                onPress={() =>
                  navigation.replace('SurveyDetail', {
                    infSurvey: surveyInfo.data,
                    isCreatingAccount: true,
                  })
                }>
                Tiếp tục sàn lọc chuyên sâu
              </Button>
            )}
          </VStack>
        ) : (
          //Good

          <VStack space={2} w="full">
            <Button
              variant={'cusPrimary'}
              w={'full'}
              onPress={() => navigation.replace('BottomTab', {screen: 'Home'})}>
              Về trang chủ
            </Button>
            <Button
              variant={'cusOutline'}
              w={'full'}
              onPress={() => {
                navigation.replace('BottomTab', {screen: 'Home'});
                toast.show({title: 'Tính năng đang được cập nhật <3'});
                // navigation.replace('ChatWithBot_Start')
              }}>
              Tư vấn 24/7
            </Button>
          </VStack>
        )
      }>
      <VStack alignItems={'center'} justifyContent={'center'} h={'100%'}>
        {resultCommonFilter?.type === 'bad' || !isDoneSurveyDetail ? (
          <>
            <Text variant={'header_1'} pt={'12.5%'} pb={4}>
              Sàn lọc chuyên sâu
            </Text>
            <Text variant={'body_large_regular'} textAlign={'center'} pt={4}>
              Dựa vào kết quả của sàn lọc chung, bạn sẽ tiếp tục trả lời{' '}
              <Text fontWeight={'bold'}>
                {surveyInfo?.data.questionCount} câu
              </Text>{' '}
              sàn lọc chuyên sâu về chủ để{' '}
              <Text fontWeight={'bold'}>
                {normalizeText(surveyInfo?.data.title ?? '')}
              </Text>
              .
            </Text>
          </>
        ) : (
          <>
            <Text variant={'header_1'} pt={'12.5%'} pb={4}>
              Kết quả
            </Text>
            <Text variant={'body_large_regular'} textAlign={'center'} pt={4}>
              Sức khoẻ tâm lý tốt. Bạn vẫn có thể sử dụng dịch vụ Tư vấn 24/7 để
              hiểu thêm về sức khỏe tâm lý của mình nhé!
            </Text>
          </>
        )}
      </VStack>
    </HeaderBack>
  );
};

export default QuizResult;
