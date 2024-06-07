import {RootStack} from '@routes/navigator';
import ChatWithBot_Start from '@screens/ChatWithBot/ChatWithBot_Start';
import ChatWithProfessional_Home from '@screens/ChatWithProfessional/Home';
import InputSelfInformation from '@screens/InputSelfInformation';
import LoginSuccess from '@screens/LoginSuccess';
import Privacy from '@screens/Privacy';
import PrivacyDetail from '@screens/PrivacyDetail';
import QuizDetail from '@screens/Quiz/QuizDetail';
import QuizResult from '@screens/Quiz/QuizResult';
import QuizStart from '@screens/Quiz/QuizStart';
import QuizStartConfirm from '@screens/Quiz/QuizStartConfirm';



export const renderInputSelfInformation = () => {
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

export const renderCommonFilter = () => {
  return (
    <>
      {/* Quiz stack */}
      <RootStack.Screen name="QuizStart" component={QuizStart} />
      <RootStack.Screen name="QuizStartConfirm" component={QuizStartConfirm} />
      <RootStack.Screen name="QuizDetail" component={QuizDetail} />
      <RootStack.Screen name="QuizResult" component={QuizResult} />
    </>
  );
};

export const renderAuthStack = () => {
  return (
    <>
      <RootStack.Screen
        name="ChatWithBot_Start"
        component={ChatWithBot_Start}
      />
      {/* <RootStack.Screen name="ChatWithBot_Start" component={QuizResult} /> */}
    </>
  );
};
