import {RootStack} from '@routes/navigator';
import ChatWithBot_Start from '@screens/ChatWithBot/ChatWithBot_Start';
import InputSelfInformation from '@screens/Auth/InputSelfInformation';
import LoginSuccess from '@screens/Auth/LoginSuccess';
import Privacy from '@screens/Auth/Privacy';
import PrivacyDetail from '@screens/Auth/PrivacyDetail';
import QuizDetail from '@screens/Quiz/QuizDetail';
import QuizResult from '@screens/Quiz/QuizResult';
import QuizStart from '@screens/Quiz/QuizStart';
import QuizStartConfirm from '@screens/Quiz/QuizStartConfirm';
import ChatWithProfessional_Start from '@screens/ChatWithProfessional/Home';
import ChatWithProfessional_Conversation from '@screens/ChatWithProfessional/Conversation';

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
    </>
  );
};

export const renderChatStack = () => {
  return (
    <>
      <RootStack.Screen
        name="ChatWithProfessional_Start"
        component={ChatWithProfessional_Start}
      />
      <RootStack.Screen
        name="ChatWithBot_Start"
        component={ChatWithBot_Start}
      />

      <RootStack.Screen
        name="ChatWithProfessional_Conversation"
        component={ChatWithProfessional_Conversation}
      />
    </>
  );
};
