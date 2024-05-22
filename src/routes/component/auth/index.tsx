import {RootStack} from '@routes/navigator';
import InputSelfInformation from '@screens/InputSelfInformation';
import LoginSuccess from '@screens/LoginSuccess';
import Privacy from '@screens/Privacy';
import PrivacyDetail from '@screens/PrivacyDetail';

export const renderAuthStack = () => {
  return (
    <>
      <RootStack.Screen name="LoginSuccess" component={LoginSuccess} />
      <RootStack.Screen name="Privacy" component={Privacy} />
      <RootStack.Screen name="PrivacyDetail" component={PrivacyDetail} />
      <RootStack.Screen
        name="InputSelfInformation"
        component={InputSelfInformation}
      />
    </>
  );
};
