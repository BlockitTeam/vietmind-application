import {RootStack} from '@routes/navigator';
import InputSelfInformation from '@screens/Auth/InputSelfInformation';
import LoginSuccess from '@screens/Auth/LoginSuccess';
import Privacy from '@screens/Auth/Privacy';
import PrivacyDetail from '@screens/Auth/PrivacyDetail';
import ChatWithBot_Start from '@screens/ChatWithBot/ChatWithBot_Start';
import ChatWithProfessional_Conversation from '@screens/ChatWithProfessional/Conversation';
import ChatWithProfessional_Start from '@screens/ChatWithProfessional/Home';
import ChangeProfile from '@screens/HomeTab/Profile/ChangeProfile';
import ProfileMultipleChoice from '@screens/HomeTab/Profile/ProfileMultipleChoice';
import SurveyDetailScreen_Depression from '@screens/HomeTab/Profile/ProfileMultipleChoice/SurveyDetailScreen/SurveyDetailScreen_Depression';
import SurveyDetailScreen_PTSD from '@screens/HomeTab/Profile/ProfileMultipleChoice/SurveyDetailScreen/SurveyDetailScreen_PTSD';
import SurveyDetailScreen_Sleep from '@screens/HomeTab/Profile/ProfileMultipleChoice/SurveyDetailScreen/SurveyDetailScreen_Sleep';
import SurveyDetailScreen_Stress from '@screens/HomeTab/Profile/ProfileMultipleChoice/SurveyDetailScreen/SurveyDetailScreen_Stress';
import SurveyDetailScreen_Unrest from '@screens/HomeTab/Profile/ProfileMultipleChoice/SurveyDetailScreen/SurveyDetailScreen_Unrest';
import QuizDetail from '@screens/Quiz/QuizDetail';
import QuizStart from '@screens/Quiz/QuizStart';
import QuizStartConfirm from '@screens/Quiz/QuizStartConfirm';
import SetTimeAppointment from '@screens/SetTimeAppointment';

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
      <RootStack.Screen
        name="ProfileMultipleChoice"
        component={ProfileMultipleChoice}
      />
      <RootStack.Screen name="ChangeProfile" component={ChangeProfile} />
      <RootStack.Screen
        name="SurveyDetail_Depression"
        component={SurveyDetailScreen_Depression}
      />
      <RootStack.Screen
        name="SurveyDetail_Sleep"
        component={SurveyDetailScreen_Sleep}
      />
      <RootStack.Screen
        name="SurveyDetail_PTSD"
        component={SurveyDetailScreen_PTSD}
      />
      <RootStack.Screen
        name="SurveyDetail_Stress"
        component={SurveyDetailScreen_Stress}
      />
      <RootStack.Screen
        name="SurveyDetail_Unrest"
        component={SurveyDetailScreen_Unrest}
      />
      <RootStack.Screen
        name="SetTimeAppointment"
        component={SetTimeAppointment}
      />
    </>
  );
};
