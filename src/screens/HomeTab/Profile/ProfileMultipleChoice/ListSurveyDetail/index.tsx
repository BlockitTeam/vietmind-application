import {Spinner, Text} from 'native-base';
import React from 'react';
import SurveyButton from '../components/SurveyButton';
import {useGetInfSurveyById} from '@hooks/survey';
import {IRootStackParamList} from '@routes/navigator';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type ListSurveyDetailProps = {
  idSur: number | null | undefined;
};

const ListSurveyDetail: React.FC<ListSurveyDetailProps> = ({idSur}) => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  console.log(idSur);
  if (idSur) {
    const {data: dataSurvey, isLoading} = useGetInfSurveyById(idSur);
    if (isLoading) return <Spinner />;
    if (!dataSurvey?.data) return null;
    return (
      <SurveyButton
        label={dataSurvey.data.title}
        callBack={() => {
          navigation.navigate('SurveyDetail', {infSurvey: dataSurvey.data});
        }}
      />
    );
  }
  return <Text>ListSurveyDetail</Text>;
};

export default ListSurveyDetail;
