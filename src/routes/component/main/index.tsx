import React from 'react';


import {RootStack} from '@routes/navigator';
import BottomTab from '@components/BottomTab';

export const renderMainStack = () => {
  return (
    <>
      <RootStack.Screen name="Main" component={BottomTab} />
    </>
  );
};
