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
// type Tab_HomeProps = BottomTabScreenProps<IBottomParamList, 'Home'>;
const Tab_Profile = () => {
  const {data: dataSurveyResponse} = useGetSurveyResponseResult();
  const [, setCurUser] = useAtom(curUserAtom);
  const [, setMessage] = useAtom(messageAuthAtom);
  const [, setResultCommonFilter] = useAtom(resultCommonFilterAtom);

  const useLogout = useLogoutMutation();
  const logout = async () => {
    await useLogout.mutate(undefined, {
      onSuccess: async () => {
        await Promise.all([
          setCurUser(undefined),
          removeJSessionID(),
          setMessage(language.vn.logout_success),
          setResultCommonFilter(undefined),
        ]);
      },
    });
  };
  console.log(dataSurveyResponse);
  return (
    <HeaderBack title="Thông tin cá nhân">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack alignItems={'center'} w={'100%'} minHeight={'100%'} pt={4}>
          {/* Start: Basic information ----- Top */}
          <>
            <Circle w="100px" h="100px" bgColor={'#D9D9D9'} />
            <Text variant={'sf_header_3'}>Trần Duy Nhã</Text>
            <Text
              variant={'body_medium_regular'}
              color={'text.neutral_secondary'}
              mb={'8px'}>
              Nam - 2001
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
            <TouchableOpacity style={styles.multiChoiceAdvise__touchable}>
              <Text flex={'1'} variant={'body_large_bold'}>
                Trắc nghiệm
              </Text>
              <ChevronRightIcon />
            </TouchableOpacity>
            {dataSurveyResponse?.data &&
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
              })}
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
