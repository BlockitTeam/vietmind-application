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
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // notifyOnChangeProps: 'all',
      // staleTime: Infinity,
      retry: false,
    },
  },
});
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <NativeBaseProvider theme={themeNativeBase}>
          <Provider>
            <RootApp />
          </Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
// 