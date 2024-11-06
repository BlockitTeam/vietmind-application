// import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
// import {
//   CommonActions,
//   CompositeNavigationProp,
//   StackActions,
//   useFocusEffect,
//   useNavigation,
// } from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {IBottomParamList} from '@routes/navigator';
// import {
//   AdviseStack,
//   IAdviseStackParamList,
// } from '@routes/navigator/bottomTab/adviesStack';
// import ChatWithProfessional_Conversation from '@screens/ChatWithProfessional/Conversation';
// import ChatWithProfessional_Start from '@screens/ChatWithProfessional/Home';
// import React from 'react';

// type AdviseStackScreenProp = CompositeNavigationProp<
//   BottomTabNavigationProp<IBottomParamList, 'Advise'>,
//   NativeStackNavigationProp<IAdviseStackParamList>
// >;
// const AdviseStackScreen = () => {
//   const navigation = useNavigation<AdviseStackScreenProp>();
//   const navigation1 =
//     useNavigation<NativeStackNavigationProp<IAdviseStackParamList>>();

//   useFocusEffect(
//     React.useCallback(() => {
//       const resetStack = () => {
//         navigation.dispatch(
//           CommonActions.reset({
//             index: 0,
//             routes: [{name: 'Advise'}],
//           }),
//         );
//       };

//       navigation.addListener('tabPress', resetStack);
//       return () => {
//         navigation.removeListener('tabPress', resetStack);
//       };
//     }, [navigation]),
//   );
//   return (
//     <AdviseStack.Navigator screenOptions={{headerShown: false}}>
//       <AdviseStack.Screen
//         name="ChatWithProfessional_Start"
//         component={ChatWithProfessional_Start}
//       />
//       <AdviseStack.Screen
//         name="ChatWithProfessional_Conversation"
//         component={ChatWithProfessional_Conversation}
//       />
//     </AdviseStack.Navigator>
//   );
// };
// export default AdviseStackScreen;
