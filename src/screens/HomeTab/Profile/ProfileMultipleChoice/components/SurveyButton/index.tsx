import {ChevronRightIcon, HStack, Text, VStack} from 'native-base'
import React from 'react'
import {TouchableOpacity} from 'react-native'

type SurveyButtonProps = {
  label: string
  callBack: () => void
}

const SurveyButton: React.FC<SurveyButtonProps> = ({label, callBack}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        callBack()
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
  )
}

export default SurveyButton
