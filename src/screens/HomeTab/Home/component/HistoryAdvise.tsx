import {HStack, VStack, Text, Skeleton} from 'native-base'
import React from 'react'
import HistoryAdviseItem from './HistoryAdviseItem'
import {useGetAppointmentFinish} from '@hooks/appointment/getAppointmentFinish'
import {clearSecond} from 'src/utils/formatDate'

import {Tab_HomeProps} from '..'

const HistoryAdvise: React.FC<Tab_HomeProps> = (props) => {
  const {data: appointmentsFinished, isLoading} = useGetAppointmentFinish()

  return (
    <VStack space={2} mt={2}>
      <HStack mb={2}>
        <Text variant={'body_large_bold'}>Lịch sử tư vấn</Text>
      </HStack>
      {isLoading || !appointmentsFinished?.data ? (
        <>
          <Skeleton h={'72px'} w="100%" />
          <Skeleton h={'72px'} w="100%" />
        </>
      ) : typeof appointmentsFinished.data === 'string' ? (
        <Text>Bạn không có lịch sử cuộc hẹn!</Text>
      ) : (
        appointmentsFinished?.data?.map((item) => {
          return (
            <HistoryAdviseItem
              drId={item.doctorId}
              time={`${item.appointmentDate.replace('-', '/')} ${clearSecond(
                item.startTime,
              )} - ${clearSecond(item.endTime)}`}
              idConversation={item.conversationId.toString()}
              key={item.conversationId + item.startTime + item.endTime}
              navigation={props.navigation}
            />
          )
        })
      )}
    </VStack>
  )
}

export default HistoryAdvise
