import React, {PropsWithChildren, ReactNode} from 'react'
import {ImageBackground} from 'react-native'
import BackGround from '@images/Background.png'
import {Center} from 'native-base'

type CusImageBackgroundProps = {
  bottomButton?: ReactNode
  nonBackGround?: boolean | string
} & PropsWithChildren
const CusImageBackground: React.FC<CusImageBackgroundProps> = (props) => {
  const {children, bottomButton, nonBackGround} = props
  return (
    <ImageBackground source={nonBackGround ? null : BackGround}>
      {bottomButton ? (
        <Center
          h={'full'}
          px={'16px'}
          bgColor={nonBackGround ? 'white' : 'transparent'}>
          <Center
            w={'full'}
            flex={1}
            alignItems={'center'}
            justifyContent={'center'}>
            {children}
          </Center>
          <Center w={'full'} mb={'24px'}>
            {bottomButton}
          </Center>
        </Center>
      ) : (
        children
      )}
    </ImageBackground>
  )
}

export default CusImageBackground
