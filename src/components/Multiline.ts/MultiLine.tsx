import React, {useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';

interface MultiLineProps extends TextInputProps {
  maxLines?: number;
}

const MultiLine: React.FC<MultiLineProps> = ({
  maxLines,
  onChangeText,
  value = '',
  ...other
}) => {
  const [textValue, setTextValue] = useState<string>(value);

  const handleChangeText = (text: string) => {
    setTextValue(text);
  };

  return (
    <TextInput
      {...other}
      multiline={true}
      value={textValue}
      placeholderTextColor={'grey'}
      onChangeText={handleChangeText}
    />
  );
};

export default MultiLine;
