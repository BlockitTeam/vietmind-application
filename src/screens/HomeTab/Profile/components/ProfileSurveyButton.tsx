import React from 'react';
import {ChevronRightIcon, HStack, Text, VStack} from 'native-base';
import {TouchableOpacity} from 'react-native';

type tProfileSurveyButton = {
  name: string;
  date: string;
  onClickCallBack: () => void;
};
const ProfileSurveyButton: React.FC<tProfileSurveyButton> = props => {
  const {date, name, onClickCallBack} = props;
  return (
    <TouchableOpacity onPress={() => onClickCallBack()}>
      <HStack
        alignItems={'center'}
        width={'100%'}
        bg={'primary.medium50'}
        borderColor={'primary.medium'}
        borderRadius={'8px'}
        borderWidth={1}
        px={4}
        py={3}>
        <VStack flex={1} space={1}>
          <Text
            variant={'body_medium_bold'}
            numberOfLines={1}
            ellipsizeMode="tail">
            {name}
          </Text>
          <Text variant={'body_medium_bold'}>
            Ngày làm:{' '}
            <Text variant={'body_medium_regular'} fontWeight={400}>
              {date}
            </Text>
          </Text>
        </VStack>
        <ChevronRightIcon />
      </HStack>
    </TouchableOpacity>
  );
};

export default ProfileSurveyButton;
