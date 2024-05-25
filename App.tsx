/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import RootApp from './src/routes/index';
import {Provider} from 'jotai';
import {NativeBaseProvider} from 'native-base';
import React from 'react';

import {useColorScheme} from 'react-native';

import {themeNativeBase} from 'src/themes/nativebase-theme';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={themeNativeBase}>
        <Provider>
          <RootApp />
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
