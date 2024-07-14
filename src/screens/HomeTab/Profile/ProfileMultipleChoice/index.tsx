import React from 'react';
import HeaderBack from '@components/layout/HeaderBack';
import {ChevronLeftIcon, HStack, ScrollView, Text, VStack} from 'native-base';
import FilterButton from '../FilterButton';

const ProfileMultipleChoice = () => {
  return (
    <HeaderBack
      title="Trắc nghiệm sàn lọc"
      buttonBack={
        <HStack alignItems={'center'} space={'2px'}>
          <ChevronLeftIcon />
          <Text color={'neutral.primary'}>Thoát</Text>
        </HStack>
      }>
      <ScrollView flex={1}>
        <VStack space={2}>
          <Text variant={'sf_header_3'} textAlign={'center'} mt={2}>
            Trắc nghiệm sàn lọc
          </Text>
          <FilterButton />
          <FilterButton />
          <FilterButton />
          <FilterButton />
          <Text variant={'sf_header_3'} textAlign={'center'} mt={2}>
            Trắc nghiệm chuyên sâu
          </Text>
        </VStack>
      </ScrollView>
    </HeaderBack>
  );
};

export default ProfileMultipleChoice;

// const styles = StyleSheet.create({});
