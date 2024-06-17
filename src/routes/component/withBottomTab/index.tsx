import BottomTab from '@routes/component/bottomTab';
import {RootStack} from '@routes/navigator';

export const renderBottomTabStack = () => {
  return (
    <>
      <RootStack.Screen name="BottomTab" component={BottomTab} />

      {/* Tư vấn stack */}
      {/* {renderHomeStack()} */}
    </>
  );
};
