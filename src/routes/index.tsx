import {RootStack} from './navigator';
import {getFirstLoad} from '@services/asyncStorage/firstLoadApp';
import React, {useEffect, useState} from 'react';
import {useAtom} from 'jotai';
import {firstLoadAtom} from '@services/jotaiStorage/firstLoadAtom';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import Splash from '@screens/Auth/Splash';
import WelcomeScreen from '@screens/Auth/Welcome';
import {
  renderChatStack,
  renderCommonFilter,
  renderInputSelfInformation,
} from './component/auth';
import Login from '@screens/Auth/Login';
import {renderBottomTabStack} from './component/withBottomTab';
import {
  getJSessionID,
  removeJSessionID,
} from '@services/asyncStorage/jsessionID';
import {messageAuthAtom} from '@services/jotaiStorage/messageAuthAtom';
import QuizResult from '@screens/Quiz/QuizResult';
import {resultCommonFilterAtom} from '@services/jotaiStorage/resltCommonFilter';
import {useCurrentUser} from '@hooks/user';

const RootApp = () => {
  const [firstInit, setFirstInit] = useAtom(firstLoadAtom);
  const [curUser, setCurUser] = useAtom(curUserAtom);
  const [resultCommonFilter] = useAtom(resultCommonFilterAtom);
  const [_, setMessageAuth] = useAtom(messageAuthAtom);
  const {refetch} = useCurrentUser();

  const expireTimeHandle = () => {
    removeJSessionID().then(() => {
      setCurUser(undefined);
      setMessageAuth('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!');
    });
  };

  useEffect(() => {
    //Have jsessionId in Application but can't call current user -> expired time token -> clear jsessionID and clear all cur user
    getJSessionID().then(jsessionId => {
      if (jsessionId) {
        try {
          refetch().then(item => {
            if (
              item.data?.statusCode === 200 &&
              item.data?.data &&
              item.data.data.username
            ) {
              setCurUser(item.data.data);
            } else {
              expireTimeHandle();
            }
          });
        } catch (error) {
          expireTimeHandle();
        }
      }
    });
  }, []);

  // Check first load app
  useEffect(() => {
    getFirstLoad().then(value => {
      if (value === '1')
        setTimeout(() => {
          return setFirstInit(true);
        }, 2000);
      else if (value === '0')
        setTimeout(() => {
          return setFirstInit(false);
        }, 2000);
    });
  }, []);
  const renderAllScreen = () => {
    // return (
    //   <>
    //     {resultCommonFilter && (
    //       <RootStack.Screen name="QuizResult" component={QuizResult} />
    //     )}
    //     {renderBottomTabStack()}
    //     {renderChatStack()}
    //   </>
    // );

    if (firstInit === undefined)
      return <RootStack.Screen name="Splash" component={Splash} />;
    else if (firstInit) {
      return <RootStack.Screen name="Welcome" component={WelcomeScreen} />;
    } else if (curUser === undefined) {
      //UnAuthentication
      return <RootStack.Screen name="Login" component={Login} />;
    } else if (curUser) {
      //Chưa input information
      if (!curUser.enabled) {
        console.log('🚀 renderAllScreen ~ renderInputSelfInformation ~');
        return <>{renderInputSelfInformation()}</>;
      }
      //Chưa sàn lọc chung
      else if (!curUser.surveyCompleted) {
        console.log('🚀 renderAllScreen ~ renderCommonFilter ~');

        return <>{renderCommonFilter()}</>;
      }
      //Đã input và sàn lọc chung
      else {
        console.log('🚀 renderAllScreen ~ else ~');
        return (
          <>
            {resultCommonFilter && (
              <RootStack.Screen name="QuizResult" component={QuizResult} />
            )}
            {renderBottomTabStack()}
            {renderChatStack()}
          </>
        );
      }
    }
    // if (user === null) {
    //   return renderßAuthStack();
    // }

    // return renderMainStack();
  };
  return (
    <RootStack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}>
      {renderAllScreen()}
    </RootStack.Navigator>
  );
};
export default RootApp;
