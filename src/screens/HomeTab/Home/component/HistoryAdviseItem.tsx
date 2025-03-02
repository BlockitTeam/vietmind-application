import React from 'react'
import {Button, HStack, Skeleton, Text, VStack} from 'native-base'
import {useGetDoctorById} from '@hooks/user'
import {Tab_HomeProps} from '..'

type HistoryAdviseItemType = {
  drId: string
  time: string
  idConversation: string
  navigation: Tab_HomeProps['navigation']
}

const HistoryAdviseItem: React.FC<HistoryAdviseItemType> = (props) => {
  const {drId, time, navigation} = props
  const {data, isLoading} = useGetDoctorById(drId)

  return (
    <HStack
      borderRadius={'8px'}
      borderWidth={1}
      borderColor={'primary.primary_light_medium'}
      bgColor={'primary.primary_light'}
      padding={'13px 12px'}>
      <VStack flex={1}>
        <Text variant={'body_medium_bold'}>
          {isLoading ? (
            <Skeleton h={'30.1px'} w={'250px'} />
          ) : (
            `BS. ${data?.data.lastName} ${data?.data.firstName}`
          )}
        </Text>
        <Text variant={'body_medium_regular'} color={'text.neutral_secondary'}>
          {time}
        </Text>
      </VStack>
      <Button
        variant={'cusOutline'}
        h={'32px'}
        px={'16px'}
        py={'0px'}
        borderRadius={'8px'}
        onPress={() =>
          navigation.navigate('ChatWithProfessional_Conversation', {
            drId: drId,
            drName: data?.data.firstName + ' ' + data?.data.lastName,
            drNameFirstLetter: data?.data.firstName[0].toUpperCase() ?? '',
          })
        }>
        <Text variant={'body_small_bold'}>Xem lại</Text>
      </Button>
    </HStack>
  )
}

export default HistoryAdviseItem
