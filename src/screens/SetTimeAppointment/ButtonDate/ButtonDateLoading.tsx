import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Skeleton} from 'native-base';
import {InterfaceSkeletonProps} from 'native-base/lib/typescript/components/composites/Skeleton/types';

type ButtonDateLoadingProps = InterfaceSkeletonProps;

const ButtonDateLoading: React.FC<ButtonDateLoadingProps> = props => {
  return <Skeleton w={'110px'} h={'31px'} rounded={8} {...props} />;
};

export default ButtonDateLoading;

const styles = StyleSheet.create({});
