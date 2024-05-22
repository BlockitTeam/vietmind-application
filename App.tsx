/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {RootApp} from '@routes';
import {Provider} from 'jotai';
import {NativeBaseProvider} from 'native-base';
import React from 'react';

import {useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {themeNativeBase} from 'src/themes/nativebase-theme';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
