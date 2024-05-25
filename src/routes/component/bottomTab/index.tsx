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
          title: 'Home',
        }}
      />
      {/* <RootBottomTab.Screen
        name="Cart"
        component={<></>}
        options={{
          title: 'Cart',
        }}
      />
      <RootBottomTab.Screen
        name="Orders"
        component={<></>}
        options={{
          title: 'Orders',
        }}
      />
      <RootBottomTab.Screen
        name="Wallet"
        component={<></>}
        options={{
          title: 'Wallet',
        }}
      />

      <RootBottomTab.Screen
        name="Profile"
        component={<></>}
        options={{
          title: 'Profile',
        }}
      /> */}
    </RootBottomTab.Navigator>
  );
};

export default BottomTab;
