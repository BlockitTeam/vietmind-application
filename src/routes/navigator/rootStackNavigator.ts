import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type IRootStackParamList = {
  Welcome: undefined;
  Main: undefined;
  Splash: undefined;
  /*Auth screen*/
  Login: undefined;
  LoginWithGoogle: undefined;
  LoginWithFacebook: undefined;
  ForgotPassword__VerifyCode: {curData: string};
  ForgotPassWord__CreateNewPass: undefined; //validateOTP
  LoginSuccess: undefined;
  Privacy: undefined;
  PrivacyDetail: undefined;
  InputSelfInformation: undefined;
  // Trắc nghiệm screen
  QuizStart: undefined;
  QuizStartConfirm: undefined;
  QuizDetail: undefined;
  QuizResult: {
    typeResult: 'good' | 'bad';
    result: {
      stress: string;
      loAu: string;
      tramCam: string;
      tuHai: string;
    };
  };
  // Chat with chuyên gia
  ChatWithProfessional_Home: undefined;

  //Chat with bot
  ChatWithBot_Start: undefined;
  ChatWithBot_Conversation: undefined;

  //Bottom tab
  BottomTab: undefined;
};

export const RootStack = createNativeStackNavigator<IRootStackParamList>();
