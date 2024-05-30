import {RootStack} from './navigator';
import {getFirstLoad} from '@services/asyncStorage/firstLoadApp';
import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {firstLoadAtom} from '@services/jotaiStorage/firstLoadAtom';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import Splash from '@screens/Splash';
import WelcomeScreen from '@screens/Welcome';
import {renderAuthStack} from './component/auth';
import Login from '@screens/Login';
import {renderBottomTabStack} from './component/withBottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootApp = () => {
  //   const {isDoneFirstTime, user} = useAppSelector(state => state.auth);
  const [firstInit, setFirstInit] = useAtom(firstLoadAtom);
  const [curUser, setCurUser] = useAtom(curUserAtom);
  useEffect(() => {
    AsyncStorage.getItem('JSESSIONID').then(v => {
      if (v) setCurUser({avatar: '1', tokenId: v, username: 'dnt'});
    }); //c
  }, []);

  // check cookie
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
    // if (!isDoneFirstTime) {
    // return renderBottomTabStack();

    if (firstInit === undefined)
      return <RootStack.Screen name="Splash" component={Splash} />;
    else if (firstInit) {
      return <RootStack.Screen name="Welcome" component={WelcomeScreen} />;
    } else if (curUser === undefined) {
      //unauth
      return <RootStack.Screen name="Login" component={Login} />;
    } else if (curUser) {
      return (
        <>
          {renderAuthStack()}
          {renderBottomTabStack()}
        </>
      );
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
