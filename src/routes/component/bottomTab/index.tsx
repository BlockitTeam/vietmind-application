import React from 'react';

import {RootBottomTab} from '@routes/navigator';
import MyTabBar from '@components/BottomBar';
import Tab_Home from '@screens/HomeTab/Home';
import Tab_Advise from '@screens/HomeTab/Advise';
import Tab_Profile from '@screens/HomeTab/Profile';
import Tab_Knowledge from '@screens/HomeTab/Knowledge';

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
        component={Tab_Advise}
        options={{
          title: 'Tư vấn',
        }}
      />
      <RootBottomTab.Screen
        name="Knowledge"
        component={Tab_Knowledge}
        options={{
          title: 'Kiến thức',
        }}
      />
      <RootBottomTab.Screen
        name="Profile"
        component={Tab_Profile}
        options={{
          title: 'Cá nhân',
        }}
      />
    </RootBottomTab.Navigator>
  );
};

export default BottomTab;
