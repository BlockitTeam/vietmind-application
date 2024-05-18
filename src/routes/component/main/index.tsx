import React from 'react';

import {renderStackProduct} from '../product';
import {renderStackNotify} from '../notify';
import {renderStackCoupon} from '../coupon';
import {renderProfileStack} from '../bottomTab/profile';
import {renderStackOrder} from '../order';
import {renderHomeStack} from '../bottomTab/home';

export const renderMainStack = () => {
  return (
    <>
      <RootStack.Screen name="Main" component={BottomTab} />
      {renderHomeStack()}
      {renderStackOrder()}
      {renderStackProduct()}
      {renderStackNotify()}
      {renderStackCoupon()}
      {renderProfileStack()}
    </>
  );
};
