import React from 'react';
import HeaderBack from '@components/layout/HeaderBack';
import {Text, Circle, Center, Button, VStack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {IAdviseStackParamList} from '@routes/navigator/bottomTab/adviesStack';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {IBottomParamList, IRootStackParamList} from '@routes/navigator';
import {useAtom} from 'jotai';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import {tDoctorResponse} from '@hooks/user/user.interface';

type ChatWithProfessional_StartNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<IRootStackParamList, 'ChatWithProfessional_Start'>,
  BottomTabScreenProps<IBottomParamList, 'Advise'>
>;
const ChatWithProfessional_Start: React.FC<
  ChatWithProfessional_StartNavigationProp
> = props => {
  const {navigation, route} = props;
  const [curUser, setCurUser] = useAtom(curUserAtom);
  const drInformation = route.params.drInformation;

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
                drId: drInformation.id,
                drName: `${drInformation.firstName} ${drInformation.lastName}`,
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
          {`${drInformation.firstName} ${drInformation.lastName}`}
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
