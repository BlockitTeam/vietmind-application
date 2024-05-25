import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Box, Text} from 'native-base';
import React from 'react';
import {Book, Home, Message, User} from '@assets/icons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const MyTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  // const MyTabBar = () => {
  const mapIconBottomTab = {
    Home: Home,
    Advise: Message, // Tư vấn
    Knowledge: Book, // Kiến thức
    User: User, // Cá nhân
  };
  const mapIconFillBottomTab = {
    Home: Home,
    Advise: Message, // Tư vấn
    Knowledge: Book, // Kiến thức
    User: User, // Cá nhân
  };

  return (
    <Box style={{...styles.container}} _ios={{safeAreaBottom: true}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        // const Icon = isFocused
        //   ? // ? mapIconFillBottomTab['Account']
        //     // : mapIconBottomTab['Account'];
        //     mapIconFillBottomTab[route.name]
        //   : mapIconBottomTab[route.name];

        return (
          <TouchableOpacity
            // style={[
            //   {
            //     paddingHorizontal: responsive(10),
            //     paddingVertical: responsive(8),
            //   },
            //   isFocused
            //     ? {
            //         borderTopColor: colors.PRIMARY,
            //         borderTopWidth: 2,
            //       }
            //     : null,
            // ]}
            key={`key_Bottom_tab_${route.name}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
              {/* <Icon fill={isFocused ? colors.PRIMARY : colors.SMOKE} /> */}
              <Text
                color={isFocused ? 'primary.100' : 'primary.600'}
                fontSize="12">
                {label.toString()}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </Box>
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

export default MyTabBar;
