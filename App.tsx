/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import RootApp from './src/routes/index';
import {Provider} from 'jotai';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {useColorScheme} from 'react-native';
import {themeNativeBase} from 'src/themes/nativebase-theme';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {IRootStackParamList} from '@routes/navigator';
import {vietmindStore} from '@services/jotaiStorage';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // notifyOnChangeProps: 'all',
      retry: false,
    },
  },
});

export const navigationRef =
  createNavigationContainerRef<IRootStackParamList>();

export function navigate(name: keyof IRootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        <NativeBaseProvider theme={themeNativeBase}>
          <Provider store={vietmindStore}>
            <RootApp />
          </Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;