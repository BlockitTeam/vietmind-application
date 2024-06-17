import React from 'react';
import HeaderBack from '@components/layout/HeaderBack';
import {Text, Circle, Center, Button, VStack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {IAdviseStackParamList} from '@routes/navigator/bottomTab/adviesStack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {IBottomParamList, IRootStackParamList} from '@routes/navigator';
import {useAtom} from 'jotai';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import {tUserResponse} from '@hooks/auth/auth.interface';

const ChatWithProfessional_Start = () => {
  const [curUser, setCurUser] = useAtom(curUserAtom);
  const navigation =
    useNavigation<NativeStackNavigationProp<IRootStackParamList>>();

  return (
    <HeaderBack
      title="Kết nối với bác sĩ tâm lý"
      bottomChildren={
        <VStack space={2}>
          <Text textAlign={'center'} px={'32px'}>
            Sau đây Vietmind sẽ bắt đầu kết nối bạn với bác sỹ.
          </Text>
          <Button
            variant={'cusPrimary'}
            onPress={() =>
              navigation.navigate('ChatWithProfessional_Conversation', {
                drId: '123',
                drName: 'Trịnh Thị Thu Thảo',
              })
            }>
            Bắt đầu
          </Button>
          <Button
            variant={'cusOutline'}
            onPress={() => {
              navigation.navigate('BottomTab', {screen: 'Advise'});
            }}>
            Bỏ qua
          </Button>
        </VStack>
      }>
      <Center>
        <Circle h={120} w={120} backgroundColor={'primary.medium'} mb={4} />
        <Text variant={'header_2'} textAlign={'center'} mb={2}>
          B S
        </Text>
        <Text variant={'header_2'} textAlign={'center'} mb={4}>
          Trịnh Thị Thu Thảo
        </Text>
        <Text textAlign={'center'}>Viện Sức khỏe Tâm thần</Text>
        <Text textAlign={'center'} mb={4}>
          Bệnh viện Bạch Mai
        </Text>
        <TouchableOpacity>
          <Text underline>Xem thêm</Text>
        </TouchableOpacity>
      </Center>
    </HeaderBack>
  );
};

export default ChatWithProfessional_Start;
