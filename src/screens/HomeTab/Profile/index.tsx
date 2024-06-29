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
// type Tab_HomeProps = BottomTabScreenProps<IBottomParamList, 'Home'>;
const Tab_Profile = () => {
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
            <HStack>
              <Text
                flex={'1'}
                variant={'body_medium_regular'}
                color="text.neutral_secondary">
                Lo âu
              </Text>
              <Text variant={'body_medium_regular'}>9.5/10</Text>
            </HStack>
            <HStack>
              <Text
                flex={'1'}
                variant={'body_medium_regular'}
                color="text.neutral_secondary">
                Trầm cảm
              </Text>
              <Text variant={'body_medium_regular'}>6/10</Text>
            </HStack>
            <HStack>
              <Text
                flex={'1'}
                variant={'body_medium_regular'}
                color="text.neutral_secondary">
                Lo âu
              </Text>
              <Text variant={'body_medium_regular'}>2/10</Text>
            </HStack>
            <HStack>
              <Text
                flex={'1'}
                variant={'body_medium_regular'}
                color="text.neutral_secondary">
                Lo âu
              </Text>
              <Text variant={'body_medium_regular'}>2/10</Text>
            </HStack>
          </VStack>
          {/* End:  -----  Multi choice advise  -----  */}

          <Divider w={'100%'} my={'16px'} bgColor={'background.medium'} />

          <VStack alignSelf={'flex-start'}>
            <TouchableOpacity>
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
