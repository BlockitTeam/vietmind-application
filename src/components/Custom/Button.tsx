import {Button} from 'native-base'
import {IButtonProps} from 'native-base/lib/typescript/components/primitives/Button/types'
import {Platform} from 'react-native'

interface ButtonProps extends IButtonProps {
  mbIOS?: number
  mbAndroid?: number
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  mbIOS,
  mbAndroid,
  ...props
}) => {
  return (
    <Button mb={Platform.OS === 'ios' ? mbIOS : mbAndroid} {...props}>
      {children}
    </Button>
  )
}

export default CustomButton
