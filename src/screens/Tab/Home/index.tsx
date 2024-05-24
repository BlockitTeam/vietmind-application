import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IBottomParamList} from '@routes/navigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';

// type Tab_HomeProps = BottomTabScreenProps<IBottomParamList, 'Home'>;
const Tab_Home = () => {
  return (
    <SafeAreaView>
      <Text>Tab_Home</Text>
    </SafeAreaView>
  );
};

export default Tab_Home;

const styles = StyleSheet.create({});
