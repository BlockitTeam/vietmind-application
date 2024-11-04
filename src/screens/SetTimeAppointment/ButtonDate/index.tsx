import React from 'react';
import {Box, Text, IBoxProps} from 'native-base';

type TButtonDate = {
  date: string;
} & IBoxProps;

const ButtonDate: React.FC<TButtonDate> = ({date, ...propsBox}) => {
  return (
    <Box
      bg="white"
      w={'110px'}
      textAlign={'center'}
      p={1}
      borderColor="primary.medium"
      borderWidth={1}
      borderRadius={8}
      {...propsBox}>
      <Text textAlign={'center'}>{date}</Text>
    </Box>
  );
};

export default ButtonDate;
