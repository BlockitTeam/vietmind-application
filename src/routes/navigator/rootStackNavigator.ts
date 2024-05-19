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
};

export const RootStack = createNativeStackNavigator<IRootStackParamList>();
