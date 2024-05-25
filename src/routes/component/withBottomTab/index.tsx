import BottomTab from '@routes/component/bottomTab';
import {RootStack} from '@routes/navigator';
import ChatWithProfessional_Home from '@screens/ChatWithProfessional/Home';

export const renderBottomTabStack = () => {
  return (
    <>
      <RootStack.Screen name="BottomTab" component={BottomTab} />

      {/* {renderHomeStack()} */}
    </>
  );
};
