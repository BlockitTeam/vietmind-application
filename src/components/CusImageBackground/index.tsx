import React, {PropsWithChildren} from 'react';
import {ImageBackground} from 'react-native';
import BackGround from '@images/Background.png';
const CusImageBackground: React.FC<PropsWithChildren> = props => {
  const {children} = props;
  return <ImageBackground source={BackGround}>{children}</ImageBackground>;
};

export default CusImageBackground;
