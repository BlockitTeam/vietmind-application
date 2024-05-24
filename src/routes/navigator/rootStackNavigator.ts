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
      stress: number;
      loAu: number;
      tramCam: number;
      tuHai: number;
    };
  };
};

export const RootStack = createNativeStackNavigator<IRootStackParamList>();
