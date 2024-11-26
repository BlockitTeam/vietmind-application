import {RootStack} from './navigator';
import {getFirstLoad} from '@services/asyncStorage/firstLoadApp';
import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {firstLoadAtom} from '@services/jotaiStorage/firstLoadAtom';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import Splash from '@screens/Auth/Splash';
import WelcomeScreen from '@screens/Auth/Welcome';
import Login from '@screens/Auth/Login';
import SetTimeAppointment from '@screens/SetTimeAppointment';

import {
  renderChatStack,
  renderCommonFilter,
  renderInputSelfInformation,
} from './component/auth';
import {renderBottomTabStack} from './component/withBottomTab';
import {
  getJSessionID,
  removeJSessionID,
} from '@services/asyncStorage/jsessionID';
import {messageAuthAtom} from '@services/jotaiStorage/messageAuthAtom';
import {resultCommonFilterAtom} from '@services/jotaiStorage/resltCommonFilter';
import {useCurrentUser} from '@hooks/user';
import {language} from '@config/language';
import QuizResult from '@screens/Quiz/QuizResult';
import SetTimeAppointmentSuccess from '@screens/SetTimeAppointment/SetTimeSuccess';
import {useGetResultById} from '@hooks/response';
import {isEmptyObject} from 'src/utils/object';

const RootApp = () => {
  const [firstInit, setFirstInit] = useAtom(firstLoadAtom);
  const [curUser, setCurUser] = useAtom(curUserAtom);
  const [_, setMessageAuth] = useAtom(messageAuthAtom);
  const {isLoading, refetch} = useCurrentUser();
  const [resultCommonFilter] = useAtom(resultCommonFilterAtom);

  const {isLoading: isGetResultById, data: getResultByIdData} =
    useGetResultById(curUser?.id || '');
  const expireTimeHandle = () => {
    removeJSessionID().then(() => {
      setCurUser(undefined);
      setMessageAuth(language.vn.expired_time);
    });
  };

  useEffect(() => {
    const initializeApp = async () => {
      const jsessionId = await getJSessionID();
      if (jsessionId) {
        try {
          const user = await refetch();
          if (user?.data?.statusCode === 200 && user.data?.data?.username) {
            setCurUser(user.data.data);
          } else {
            expireTimeHandle();
          }
        } catch (error) {
          expireTimeHandle();
        }
      }
    };

    const loadFirstInit = async () => {
      const value = await getFirstLoad();
      setFirstInit(value === '1');
    };

    initializeApp();
    loadFirstInit();
  }, [refetch]);

  const renderAllScreen = () => {
    if (firstInit === undefined || isLoading || isGetResultById) {
      return <RootStack.Screen name="Splash" component={Splash} />;
    }

    if (firstInit) {
      return <RootStack.Screen name="Welcome" component={WelcomeScreen} />;
    }

    if (!curUser) {
      return <RootStack.Screen name="Login" component={Login} />;
    }
    // if (!curUser.enabled) {
    //Edit here when done feature
    if (!curUser.enabled) {
      return renderInputSelfInformation();
    }
    //Edit here when done feature

    if (!getResultByIdData || isEmptyObject(getResultByIdData.data)) {
      return renderCommonFilter();
    }
    const isDoneSurveyDetail =
      curUser?.surveyDetail && curUser.latestSpecializedVersion;
    const isGoodType = curUser?.surveyDetail === null;
    console.log('isDoneSurveyDetail: ', curUser?.surveyDetail);
    console.log('resultCommonFilter: ', curUser.latestSpecializedVersion);
    console.log(resultCommonFilter || !isDoneSurveyDetail || isGoodType);
    return (
      <>
        {(resultCommonFilter || !isDoneSurveyDetail || isGoodType) && (
          <>
            <RootStack.Screen name="QuizResult" component={QuizResult} />
            <RootStack.Screen
              name="SetTimeAppointment"
              component={SetTimeAppointment}
            />
            <RootStack.Screen
              name="SetTimeAppointmentSuccess"
              component={SetTimeAppointmentSuccess}
            />
          </>
        )}
        {renderBottomTabStack()}
        {renderChatStack()}
      </>
    );
  };

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {renderAllScreen()}
    </RootStack.Navigator>
  );
};

export default RootApp;
