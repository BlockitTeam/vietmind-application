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
import React from 'react'
import {themeNativeBase} from 'src/themes/nativebase-theme'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {IRootStackParamList} from '@routes/navigator'
import {vietmindStore} from '@services/jotaiStorage'
import ExpiredModal from '@screens/Auth/Login/expiredModal'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // notifyOnChangeProps: 'all',
      retry: false,
    },
  },
})

export const navigationRef = createNavigationContainerRef<IRootStackParamList>()

export function navigate(name: keyof IRootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params)
  }
}
function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        <NativeBaseProvider theme={themeNativeBase}>
          <Provider store={vietmindStore}>
            <SafeAreaProvider>
              <SafeAreaView style={{flex: 1}}>
                <RootApp />
                <ExpiredModal />
              </SafeAreaView>
            </SafeAreaProvider>
          </Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App;