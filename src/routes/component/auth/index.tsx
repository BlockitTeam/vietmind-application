import {RootStack} from '@routes/navigator'
import InputSelfInformation from '@screens/Auth/InputSelfInformation'
import LoginSuccess from '@screens/Auth/LoginSuccess'
import Privacy from '@screens/Auth/Privacy'
import PrivacyDetail from '@screens/Auth/PrivacyDetail'
import ChatWithBot_Start from '@screens/ChatWithBot/ChatWithBot_Start'
import ChatWithProfessional_Conversation from '@screens/ChatWithProfessional/Conversation'
import ChatWithProfessional_Start from '@screens/ChatWithProfessional/Home'
import ChangeProfile from '@screens/HomeTab/Profile/ChangeProfile'
import GeneralSurveyResult from '@screens/HomeTab/Profile/components/GeneralSurveyResult'
import ProfileMultipleChoice from '@screens/HomeTab/Profile/ProfileMultipleChoice'
import SurveyDetailScreen from '@screens/HomeTab/Profile/ProfileMultipleChoice/SurveyDetailScreen'

import QuizDetail from '@screens/Quiz/QuizDetail'
import QuizStart from '@screens/Quiz/QuizStart'
import QuizStartConfirm from '@screens/Quiz/QuizStartConfirm'
import SetTimeAppointment from '@screens/SetTimeAppointment'
import SetTimeAppointmentSuccess from '@screens/SetTimeAppointment/SetTimeSuccess'
import ViewHistoryAdvise from '@screens/ViewHistoryAdvise/ViewHistoryAdvise'
import React from 'react'

export const renderInputSelfInformation = () => {
  return (
    <React.Fragment>
      <RootStack.Screen name="LoginSuccess" component={LoginSuccess} />
      <RootStack.Screen name="Privacy" component={Privacy} />
      <RootStack.Screen name="PrivacyDetail" component={PrivacyDetail} />
      <RootStack.Screen
        name="InputSelfInformation"
        component={InputSelfInformation}
      />
    </React.Fragment>
  )
}

export const renderCommonFilter = () => {
  return (
    <>
      {/* Quiz stack */}
      <RootStack.Screen name="QuizStart" component={QuizStart} />
      <RootStack.Screen name="QuizStartConfirm" component={QuizStartConfirm} />
      <RootStack.Screen name="QuizDetail" component={QuizDetail} />
      <RootStack.Screen
        name="SetTimeAppointment"
        component={SetTimeAppointment}
      />
      <RootStack.Screen
        name="SetTimeAppointmentSuccess"
        component={SetTimeAppointmentSuccess}
      />
    </>
  )
}

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

      {/* <RootStack.Screen name="DetailResult" component={DetailResult} /> */}
      <RootStack.Screen name="ChangeProfile" component={ChangeProfile} />
      <RootStack.Screen name="SurveyDetail" component={SurveyDetailScreen} />

      <RootStack.Screen
        name="GeneralSurveyResult"
        component={GeneralSurveyResult}
      />

      <RootStack.Screen
        name="ViewHistoryAdvise"
        component={ViewHistoryAdvise}
      />
    </>
  )
}
