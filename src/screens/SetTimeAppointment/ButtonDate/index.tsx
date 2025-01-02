import React from 'react'
import {Box, Text, IBoxProps} from 'native-base'
import {TouchableOpacity} from 'react-native'

type TButtonDate = {
  date: string
  onPress: () => void
  isSelected: boolean
} & IBoxProps

const ButtonDate: React.FC<TButtonDate> = ({
  date,
  onPress,
  isSelected,
  ...propsBox
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        bg={isSelected ? 'primary.medium' : 'white'}
        w={'110px'}
        textAlign={'center'}
        p={1}
        borderColor={isSelected ? 'transparent' : 'primary.medium'}
        borderWidth={1}
        borderRadius={8}
        {...propsBox}>
        <Text textAlign={'center'}>{date}</Text>
      </Box>
    </TouchableOpacity>
  )
}

export default ButtonDate
