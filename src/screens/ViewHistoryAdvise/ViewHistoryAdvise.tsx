import React from 'react';
import HeaderBack from '@components/layout/HeaderBack';
import {ChevronLeftIcon, HStack, Text} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@routes/navigator';
import {useGetAppointmentById} from '@hooks/appointment/getAppointmentById';
import {useGetConversationContent} from '@hooks/coversation';

type ViewHistoryAdviseProps = NativeStackScreenProps<
  IRootStackParamList,
  'ViewHistoryAdvise'
>;
const ViewHistoryAdvise: React.FC<ViewHistoryAdviseProps> = props => {
  const {route} = props;
  const {params} = route;
  const {data} = useGetConversationContent(params.idConversation);
  console.log(data);
  return (
    <HeaderBack
      title="Lịch sử tư vấn"
      buttonBack={
        <HStack alignItems={'center'} space={'2px'}>
          <ChevronLeftIcon />
          <Text variant={'caption_regular'} color={'neutral.primary'}>
            Quay lại
          </Text>
        </HStack>
      }>
      <Text>ViewHistoryAdvise</Text>
    </HeaderBack>
  );
};

export default ViewHistoryAdvise;
