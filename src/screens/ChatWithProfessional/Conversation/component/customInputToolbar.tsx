import React from 'react';
import {Input, Button} from 'native-base';
import {Send} from '@assets/icons';

interface CustomInputToolbarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

const CustomInputToolbar: React.FC<CustomInputToolbarProps> = ({
  value,
  onChangeText,
  onSend,
}) => {
  return (
    <>
      <Input
        flex={1}
        variant={'outline'}
        placeholder="Tin nhắn..."
        m={0}
        value={value}
        onChangeText={onChangeText}
      />
      <Button
        variant={'unstyled'}
        disabled={value.trim().length <= 0}
        onPress={onSend}>
        <Send fill={value.length > 0 ? '#C2F8CB' : '#E0E9ED'} />
      </Button>
    </>
  );
};

export default CustomInputToolbar;
