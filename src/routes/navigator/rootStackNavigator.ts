import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {IBottomParamList} from './bottomTab/bottomTab'
import {tDoctorResponse} from '@hooks/user/user.interface'
import {TInfSurvey} from '@hooks/survey'
import {tCreateAppointmentResponse} from '@hooks/appointment/createAppointment'
import {tQuestionResponse} from '@hooks/question/question.interface'

export type IRootStackParamList = {
  Welcome: undefined
  Main: undefined
  Splash: undefined
  /*Auth screen*/
  Login: undefined
  LoginWithGoogle: undefined
  LoginWithFacebook: undefined
  ForgotPassword__VerifyCode: {curData: string}
  ForgotPassWord__CreateNewPass: undefined //validateOTP
  LoginSuccess: undefined
  Privacy: undefined
  PrivacyDetail: undefined
  InputSelfInformation: undefined

  DetailResult: undefined
  // Trắc nghiệm screen
  QuizStart: undefined
  QuizStartConfirm: undefined
  QuizDetail: undefined
  QuizResult: undefined
  // Chat with chuyên gia
  ChatWithProfessional_Start: {drInformation: tDoctorResponse}
  ChatWithProfessional_Conversation: {
    drName: string
    drId: string
  }
  //Chat with bot
  ChatWithBot_Start: undefined
  ChatWithBot_Conversation: undefined

  //Bottom tab
  BottomTab: {screen: keyof IBottomParamList}

  //
  ProfileMultipleChoice: undefined
  ChangeProfile: undefined

  SurveyDetail: {infSurvey: TInfSurvey; isCreatingAccount?: boolean} //First time create account and survey

  SetTimeAppointment: undefined
  SetTimeAppointmentSuccess: {infAppointment: tCreateAppointmentResponse}

  GeneralSurveyResult: {title: string; res: tQuestionResponse[]}

  ViewHistoryAdvise: {idConversation: string}
}

export const RootStack = createNativeStackNavigator<IRootStackParamList>()
