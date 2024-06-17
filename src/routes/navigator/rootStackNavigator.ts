import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IBottomParamList} from './bottomTab/bottomTab';

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
  QuizResult: undefined;
  // Chat with chuyên gia
  ChatWithProfessional_Start: undefined;
  ChatWithProfessional_Conversation: {
    drName: string;
    drId: string;
  };
  //Chat with bot
  ChatWithBot_Start: undefined;
  ChatWithBot_Conversation: undefined;

  //Bottom tab
  BottomTab: {screen: keyof IBottomParamList};
};

export const RootStack = createNativeStackNavigator<IRootStackParamList>();
