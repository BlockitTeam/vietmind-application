import {StyleSheet, View} from 'react-native';
import React from 'react';
import {IBottomParamList} from '@routes/navigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Center, Text} from 'native-base';

// type Tab_HomeProps = BottomTabScreenProps<IBottomParamList, 'Home'>;
const Tab_Home = () => {
  return (
    <SafeAreaView>
      <Center h={'full'}>
        <Text>Tab_Home</Text>
      </Center>
    </SafeAreaView>
  );
};

export default Tab_Home;
