import {StyleSheet, View, TouchableOpacity} from 'react-native';
// import {Box, Text} from 'native-base';
// import React from 'react';
// import {colors, responsive} from '@common/styles';
// import {
//   Home,
//   HomeFill,
//   Cart,
//   CartFill,
//   OrderFill,
//   Order,
//   Wallet,
//   WalletFill,
//   Profile,
//   ProfileFill,
// } from '@icons';

const BottomTab = () => {
  //   const mapIconBottomTab = {
  //     Home: Home,
  //     Cart: Cart,
  //     Orders: Order,
  //     Wallet: Wallet,
  //     Profile: Profile,
  //   };
  //   const mapIconFillBottomTab = {
  //     Home: HomeFill,
  //     Cart: CartFill,
  //     Orders: OrderFill,
  //     Wallet: WalletFill,
  //     Profile: ProfileFill,
  //   };

  return (
    <View style={styles.container}>
      <TouchableOpacity>1</TouchableOpacity>
      <TouchableOpacity>2</TouchableOpacity>
      <TouchableOpacity>3</TouchableOpacity>
      <TouchableOpacity>4</TouchableOpacity>
    </View>
    // <Box style={{...styles.container}} _ios={{safeAreaBottom: true}}>
    //   {state.routes.map((route, index) => {
    //     const {options} = descriptors[route.key];
    //     const label = options.tabBarLabel || options.title || route.name;
    //     const isFocused = state.index === index;

    //     const onPress = () => {
    //       const event = navigation.emit({
    //         type: 'tabPress',
    //         target: route.key,
    //         canPreventDefault: true,
    //       });

    //       if (!isFocused && !event.defaultPrevented) {
    //         navigation.navigate(route.name);
    //       }
    //     };

    //     const onLongPress = () => {
    //       navigation.emit({
    //         type: 'tabLongPress',
    //         target: route.key,
    //       });
    //     };
    //     const Icon = isFocused
    //       ? // ? mapIconFillBottomTab['Account']
    //         // : mapIconBottomTab['Account'];
    //         mapIconFillBottomTab[route.name]
    //       : mapIconBottomTab[route.name];

    //     return (
    //       <TouchableOpacity
    //         style={[
    //           {
    //             paddingHorizontal: responsive(10),
    //             paddingVertical: responsive(8),
    //           },
    //           isFocused
    //             ? {
    //                 borderTopColor: colors.PRIMARY,
    //                 borderTopWidth: 2,
    //               }
    //             : null,
    //         ]}
    //         key={`key_Bottom_tab_${route.name}`}
    //         accessibilityRole="button"
    //         accessibilityState={isFocused ? {selected: true} : {}}
    //         accessibilityLabel={options.tabBarAccessibilityLabel}
    //         testID={options.tabBarTestID}
    //         onPress={onPress}
    //         onLongPress={onLongPress}>
    //         <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
    //           <Icon fill={isFocused ? colors.PRIMARY : colors.SMOKE} />
    //           <Text color={isFocused ? 'primary.100' : 'smoke'} fontSize="12">
    //             {label.toString()}
    //           </Text>
    //         </View>
    //       </TouchableOpacity>
    //     );
    //   })}
    // </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: colors.WHITE,
    // borderTopColor: colors.LINE,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default BottomTab;
