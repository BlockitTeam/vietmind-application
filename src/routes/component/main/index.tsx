import React from 'react';


import {RootStack} from '@routes/navigator';
import BottomTab from '@routes/component/BottomTab';

export const renderMainStack = () => {
  return (
    <>
      <RootStack.Screen name="Main" component={BottomTab} />
    </>
  );
};
