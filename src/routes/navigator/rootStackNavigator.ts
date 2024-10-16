import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IBottomParamList} from './bottomTab/bottomTab';
import {tDoctorResponse} from '@hooks/user/user.interface';

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
  ChatWithProfessional_Start: {drInformation: tDoctorResponse};
  ChatWithProfessional_Conversation: {
    drName: string;
    drId: string;
  };
  //Chat with bot
  ChatWithBot_Start: undefined;
  ChatWithBot_Conversation: undefined;

  //Bottom tab
  BottomTab: {screen: keyof IBottomParamList};

  //
  ProfileMultipleChoice: undefined;
  ChangeProfile: undefined;

  SurveyDetail_Depression: undefined;
  SurveyDetail_PTSD: undefined;
  SurveyDetail_Sleep: undefined;
  SurveyDetail_Unrest: undefined;
  SurveyDetail_Stress: undefined;

  //
  SetTimeAppointment: undefined;
};

export const RootStack = createNativeStackNavigator<IRootStackParamList>();
