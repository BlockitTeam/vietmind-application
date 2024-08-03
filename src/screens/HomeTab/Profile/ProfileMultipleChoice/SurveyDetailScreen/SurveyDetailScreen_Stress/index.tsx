import HeaderBack from '@components/layout/HeaderBack';
import {useGetStressSurvey} from '@hooks/question';
import {ChevronLeftIcon, HStack, ScrollView, Text} from 'native-base';
import React from 'react';
type SurveyDetailScreen_StressProps = {};
const SurveyDetailScreen_Stress: React.FC<
  SurveyDetailScreen_StressProps
> = props => {
  const {} = props;
  const {data: dataStressSurvey} = useGetStressSurvey();
  return (
    <HeaderBack
      title={`Trắc nghiệm / Trầm cảm`}
      buttonBack={
        <HStack alignItems={'center'} space={'2px'}>
          <ChevronLeftIcon />
          <Text color={'neutral.primary'}>Thoát</Text>
        </HStack>
      }>
      <ScrollView flex={1}></ScrollView>
    </HeaderBack>
  );
};

export default SurveyDetailScreen_Stress;
