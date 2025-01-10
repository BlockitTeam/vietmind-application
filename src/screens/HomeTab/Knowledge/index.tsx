import HeaderLayout from '@components/layout/Header'
import {Center, Text} from 'native-base'
import React from 'react'

const Tab_Knowledge = () => {
  return (
    <HeaderLayout title="Kiến thức">
      {/* Start: Next event */}
      <Center w={'100%'}>
        <Text variant={'body_large_bold'} fontSize={'2xl'} pt={'80%'}>
          Coming soon!
        </Text>
      </Center>
    </HeaderLayout>
  )
}

export default Tab_Knowledge
