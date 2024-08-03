import React from 'react';
import HeaderBack from '@components/layout/HeaderBack';
import {ChevronLeftIcon, HStack, ScrollView, Text, VStack} from 'native-base';
import FilterButton from './components/FilterButton';
import {useGetSurveyResponseResult} from '@hooks/response';
import {useGetStressSurvey, useGetUnrestSurvey} from '@hooks/question';
import SurveyButton from './components/SurveyButton';

const ProfileMultipleChoice = () => {
  const {data: dataSurveyResponse} = useGetSurveyResponseResult();

  return (
    <HeaderBack
      title="Trắc nghiệm sàng lọc"
      buttonBack={
        <HStack alignItems={'center'} space={'2px'}>
          <ChevronLeftIcon />
          <Text color={'neutral.primary'}>Thoát</Text>
        </HStack>
      }>
      <ScrollView flex={1}>
        <VStack space={2}>
          <Text variant={'sf_header_3'} textAlign={'center'} mt={2}>
            Trắc nghiệm sàng lọc
          </Text>

          {dataSurveyResponse?.data &&
            Object.entries(dataSurveyResponse?.data).map(i => {
              return (
                <FilterButton key={i[0].toString()} label={i[0]} value={i[1]} />
              );
            })}

          <Text variant={'sf_header_3'} textAlign={'center'} mt={2}>
            Trắc nghiệm chuyên sâu
          </Text>
          <SurveyButton label="Trầm cảm" to="SurveyDetail_Stress" />
          <SurveyButton label="Lo âu" to="SurveyDetail_Unrest" />
        </VStack>
      </ScrollView>
    </HeaderBack>
  );
};

export default ProfileMultipleChoice;

// const styles = StyleSheet.create({});
