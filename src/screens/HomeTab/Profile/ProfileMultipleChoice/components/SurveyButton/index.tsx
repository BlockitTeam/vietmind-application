import {useNavigation, NavigationProp} from '@react-navigation/native';
import {IRootStackParamList} from '@routes/navigator';
import {ChevronRightIcon, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';

type SurveyButtonProps = {
  label: string;
  to:
    | 'SurveyDetail_Depression'
    | 'SurveyDetail_Sleep'
    | 'SurveyDetail_PTSD'
    | 'SurveyDetail_Unrest'
    | 'SurveyDetail_Stress';
};

const SurveyButton: React.FC<SurveyButtonProps> = ({label, to}) => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(to);
      }}>
      <HStack
        alignItems={'center'}
        padding={'12px 16px'}
        borderWidth={1}
        borderColor={'primary.medium'}
        borderRadius={'8px'}>
        <VStack flex={1}>
          <Text variant={'body_large_bold'}>{label}</Text>
        </VStack>
        <Text>
          <ChevronRightIcon />
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default SurveyButton;
