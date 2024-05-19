import WelcomeScreen from '@screens/Welcome';
import {RootStack} from './navigator';
import {renderMainStack} from './component/main';
import {getFirstLoad} from '@services/asyncStorage/firstLoadApp';
import {useEffect, useState} from 'react';
import Splash from '@screens/Splash';
import {useAtom} from 'jotai';
import {firstLoadAtom} from '@services/jotaiStorage/firstLoadAtom';
import Login from '@screens/Login';

export const RootApp = () => {
  //   const {isDoneFirstTime, user} = useAppSelector(state => state.auth);
  const [firstInit, setFirstInit] = useAtom(firstLoadAtom);

  useEffect(() => {
    getFirstLoad().then(value => {
      if (value === '0')
        setTimeout(() => {
          return setFirstInit(false);
        }, 2000);
      else if (value === '1')
        setTimeout(() => {
          return setFirstInit(true);
        }, 2000);
    });
  }, []);

  // console.log('----------------------------', firstLoad);

  console.log('-------- First init --------: ', firstInit);
  const renderAllScreen = () => {
    // if (!isDoneFirstTime) {
    if (firstInit === undefined)
      return <RootStack.Screen name="Splash" component={Splash} />;
    else if (firstInit) {
      return <RootStack.Screen name="Welcome" component={WelcomeScreen} />;
    } else if (true) {
      //unauth
      return <RootStack.Screen name="Login" component={Login} />;
    }
    // if (user === null) {
    //   return renderAuthStack();
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
