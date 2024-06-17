import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Box, Center, Circle, HStack, Text, VStack} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBack from '@components/layout/HeaderBack';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {IBottomParamList, IRootStackParamList} from '@routes/navigator';
type Tab_AdviseProps = CompositeScreenProps<
  BottomTabScreenProps<IBottomParamList, 'Advise'>,
  NativeStackScreenProps<IRootStackParamList>
>;

const Tab_Advise: React.FC<Tab_AdviseProps> = props => {
  const {navigation} = props;
  return (
    <HeaderBack title="Tư vấn">
      <Box h={4}></Box>
      <VStack space={2}>
        <TouchableOpacity
          onPress={() => {
            //Add dr information
            navigation.navigate('ChatWithProfessional_Start');
          }}>
          <HStack alignItems={'center'}>
            <HStack flex={1} space={2} alignItems={'center'}>
              <Circle h={8} w={8} backgroundColor={'primary.medium'} />
              <VStack>
                <Text>BS. Trịnh Thị Thu Thảo</Text>
                <Text>Bệnh viện bạch mai</Text>
              </VStack>
            </HStack>
            <Box>Tư vấn ngay</Box>
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity>
          <HStack alignItems={'center'}>
            <HStack flex={1} space={2} alignItems={'center'}>
              <Circle h={8} w={8} backgroundColor={'primary.medium'} />
              <VStack>
                <Text>Tư vấn với AI Bot</Text>
                <Text>24/7</Text>
              </VStack>
            </HStack>
            <Box>Tư vấn ngay</Box>
          </HStack>
        </TouchableOpacity>
      </VStack>
    </HeaderBack>
  );
};

export default Tab_Advise;
