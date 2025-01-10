import React, {useState} from 'react'
import {Button, HStack, Text} from 'native-base'
import {useNavigation} from '@react-navigation/native'
import CusImageBackground from '@components/layout/CusImageBackground'

type ErrorComponentProps = {
  title: string
  refetchCallback: () => void
  goBackCallback?: {
    func: () => void
    title: string
  }
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  title,
  refetchCallback,
  goBackCallback,
}) => {
  const navigation = useNavigation()
  const [titleCallback, setTitleCallBack] = useState('Quay lại')
  const handleGoBack = () => {
    if (goBackCallback) {
      goBackCallback.func()
      setTitleCallBack(goBackCallback.title)
    } else {
      navigation.goBack()
    }
  }

  return (
    <CusImageBackground
      bottomButton={
        <HStack space={2}>
          <Button onPress={handleGoBack} variant={'cusOutline'} flex={1}>
            {titleCallback}
          </Button>
          <Button onPress={refetchCallback} variant={'cusPrimary'} flex={2}>
            Thử lại
          </Button>
        </HStack>
      }>
      <Text variant={'header_2'} textAlign={'center'} mb={'40'}>
        {title}
      </Text>
    </CusImageBackground>
  )
}

export default ErrorComponent
