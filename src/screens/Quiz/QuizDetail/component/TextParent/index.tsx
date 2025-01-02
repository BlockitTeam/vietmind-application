import {Text, View} from 'native-base'
import React from 'react'

type TextParentProps = {
  title: string
}

const TextParent: React.FC<TextParentProps> = (props) => {
  const {title} = props
  return <Text color={'gray.600'}>{title}</Text>
}

export default TextParent
