import {StyleSheet, View, TouchableOpacity, SafeAreaView} from 'react-native';
import {Box, Center, Text} from 'native-base';
import React from 'react';
import {Book, Home, Message, Profile} from '@assets/icons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const MyTabBar: React.FC<BottomTabBarProps> = props => {
  const {state, descriptors, navigation} = props;
  // const MyTabBar = () => {
  const mapIconBottomTab = {
    Home: Home,
    Advise: Message, // Tư vấn
    Knowledge: Book, // Kiến thức
    Profile: Profile, // Cá nhân
  };
  // const mapIconFillBottomTab = {
  //   Home: Home,
  //   Advise: Message, // Tư vấn
  //   Knowledge: Book, // Kiến thức
  //   User: User, // Cá nhân
  // };

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
        // @ts-expect-error: Let's ignore - but please check it when have error
        const Icon = mapIconBottomTab?.[route.name] ?? <Home />;

        return (
          <TouchableOpacity
            style={[
              {
                paddingHorizontal: 16,
                paddingTop: 8,
                borderTopColor: 'transparent',
              },
              isFocused
                ? {
                    borderTopColor: '#C2F8CB',
                  }
                : null,
            ]}
            key={`key_Bottom_tab_${route.name}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
              <Center
                px={3}
                py={2}
                borderRadius={'8px'}
                background={isFocused ? 'primary.medium' : 'transparent'}>
                <Icon stroke={isFocused ? '#344E41' : '#5F7581'} />
              </Center>
              <Text
                color={
                  isFocused ? 'text.neutral_primary' : 'text.neutral_teriary'
                }
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#C2F8CB50',
    // borderTopColor: colors.LINE,
    // borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default MyTabBar;
