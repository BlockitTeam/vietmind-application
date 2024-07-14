import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Button,
  Center,
  ChevronRightIcon,
  Circle,
  Divider,
  HStack,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base';
import HeaderBack from '@components/layout/HeaderBack';
import {Pencil} from '@assets/icons';
import {useGetSurveyResponseResult} from '@hooks/response';
import {useLogoutMutation} from '@hooks/auth';
import {useAtom} from 'jotai';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import {removeJSessionID} from '@services/asyncStorage/jsessionID';
import {messageAuthAtom} from '@services/jotaiStorage/messageAuthAtom';
import {language} from '@config/language';
import {resultCommonFilterAtom} from '@services/jotaiStorage/resltCommonFilter';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {IBottomParamList, IRootStackParamList} from '@routes/navigator';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type Tab_ProfileProps = CompositeScreenProps<
  BottomTabScreenProps<IBottomParamList, 'Profile'>,
  NativeStackScreenProps<IRootStackParamList>
>;

const Tab_Profile: React.FC<Tab_ProfileProps> = ({navigation}) => {
  const {data: dataSurveyResponse} = useGetSurveyResponseResult();
  const [curUser, setCurUser] = useAtom(curUserAtom);
  const [, setMessage] = useAtom(messageAuthAtom);
  const [, setResultCommonFilter] = useAtom(resultCommonFilterAtom);
  const useLogout = useLogoutMutation();
  const logout = async () => {
    await useLogout.mutate(undefined, {
      onSuccess: async () => {
        await Promise.all([
          setMessage(language.vn.logout_success),
          setResultCommonFilter(undefined),
          setCurUser(undefined),
          removeJSessionID(),
        ]);
      },
    });
  };
  return (
    <HeaderBack title="Thông tin cá nhân">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack alignItems={'center'} w={'100%'} minHeight={'100%'} pt={4}>
          {/* Start: Basic information ----- Top */}
          <>
            <Circle w="100px" h="100px" bgColor={'#D9D9D9'} />
            <Text
              variant={
                'sf_header_3'
              }>{`${curUser?.firstName} ${curUser?.lastName}`}</Text>
            <Text
              variant={'body_medium_regular'}
              color={'text.neutral_secondary'}
              mb={'8px'}>
              {`${curUser?.gender} - ${curUser?.birthYear}`}
            </Text>
            <Button
              variant={'cusOutline'}
              h={'32px'}
              px={'12px'}
              py="0px"
              mb={'32px'}>
              <HStack alignItems={'center'} space={2}>
                <Pencil />
                <Text variant={'body_small_bold'}>Thay đổi thông tin</Text>
              </HStack>
            </Button>
          </>
          {/* End: Basic information ----- Top */}

          {/* Start:  -----  Multi choice advise  -----  */}
          <VStack w={'100%'} space={'6px'}>
            <TouchableOpacity
              style={styles.multiChoiceAdvise__touchable}
              onPress={() => {
                navigation.navigate('ProfileMultipleChoice');
              }}>
              <Text flex={'1'} variant={'body_large_bold'}>
                Trắc nghiệm
              </Text>
              <ChevronRightIcon />
            </TouchableOpacity>
            {!dataSurveyResponse?.data ? (
              <VStack space={4}>
                <Skeleton h={'24px'} />
                <Skeleton h={'24px'} />
                <Skeleton h={'24px'} />
                <Skeleton h={'24px'} />
              </VStack>
            ) : (
              Object.entries(dataSurveyResponse?.data).map(i => {
                return (
                  <HStack key={i[0]}>
                    <Text
                      flex={'1'}
                      variant={'body_medium_regular'}
                      color="text.neutral_secondary">
                      {i[0]}
                    </Text>
                    <Text variant={'body_medium_regular'}>{i[1]}</Text>
                  </HStack>
                );
              })
            )}
          </VStack>
          {/* End:  -----  Multi choice advise  -----  */}

          <Divider w={'100%'} my={'16px'} bgColor={'background.medium'} />

          <VStack alignSelf={'flex-start'}>
            <TouchableOpacity onPress={logout}>
              <Text variant={'body_large_bold'} color={'error.error_dark'}>
                Đăng xuất
              </Text>
            </TouchableOpacity>
          </VStack>
        </VStack>
      </ScrollView>
    </HeaderBack>
  );
};

const styles = StyleSheet.create({
  multiChoiceAdvise__touchable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Tab_Profile;
