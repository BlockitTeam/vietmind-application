import React from 'react';

import {RootBottomTab} from '@routes/navigator';
import MyTabBar from '@components/BottomBar';
import {View} from 'native-base';
import Tab_Home from '@screens/Tab/Home';
// import ActivityScreen from '@screens/Activity';
// import VoucherScreen from '@screens/Voucher';
// import AccountScreen from '@screens/Account/MainScreen';
// import CartScreen from '@screens/Cart/MainScreen';

const BottomTab = () => {
  return (
    <RootBottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <RootBottomTab.Screen
        name="Home"
        component={Tab_Home}
        options={{
          title: 'Trang chủ',
        }}
      />
      <RootBottomTab.Screen
        name="Advise"
        component={Tab_Home}
        options={{
          title: 'Tư vấn',
        }}
      />
      <RootBottomTab.Screen
        name="Knowledge"
        component={Tab_Home}
        options={{
          title: 'Kiến thức',
        }}
      />
      <RootBottomTab.Screen
        name="User"
        component={Tab_Home}
        options={{
          title: 'Cá nhân',
        }}
      />
    </RootBottomTab.Navigator>
  );
};

export default BottomTab;
