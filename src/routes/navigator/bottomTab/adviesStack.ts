import {createNativeStackNavigator} from '@react-navigation/native-stack'

export type IAdviseStackParamList = {
  // ChatWithProfessional_Start: undefined;
  // ChatWithProfessional_Conversation: {
  //   drName: string;
  //   drId: string;
  // };
}

export const AdviseStack = createNativeStackNavigator<IAdviseStackParamList>()
