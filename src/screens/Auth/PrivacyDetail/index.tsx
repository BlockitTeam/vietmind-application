import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import {
  Box,
  Center,
  ChevronLeftIcon,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {IRootStackParamList} from '@routes/navigator'
import HeaderBack from '@components/layout/HeaderBack'

type PrivacyDetailProps = NativeStackScreenProps<
  IRootStackParamList,
  'PrivacyDetail'
>

const PrivacyDetail: React.FC<PrivacyDetailProps> = (props) => {
  const {navigation} = props
  return (
    // <SafeAreaView>
    //   <VStack h={'full'}>

    //   </VStack>
    // </SafeAreaView>
    <HeaderBack
      title="Quyền riêng tư & Dữ liệu cá nhân"
      bottomChildren={null}
      buttonBack={
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}>
          <Center flexDirection={'row'}>
            <ChevronLeftIcon />
            <Text ml={'2px'}>Quay lại</Text>
          </Center>
        </TouchableOpacity>
      }>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Text
          variant={'header_2'}
          width={270}
          textAlign={'center'}
          alignSelf={'center'}>
          Quyền riêng tư & Dữ liệu cá nhân
        </Text>
        <Text variant={'header_3'} style={styles.header3}>
          1. Quyền riêng tư
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque
          aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id
          sapien. Vestibulum malesuada orci sit amet pretium facilisis. In
          lobortis congue augue, a commodo libero tincidunt scelerisque. Donec
          tempus congue lacinia. Phasellus lacinia felis est, placerat commodo
          odio tincidunt iaculis. Sed felis magna, iaculis a metus id,
          ullamcorper suscipit nulla. Fusce facilisis, nunc ultricies posuere
          porttitor, nisl lacus tincidunt diam, vel feugiat nisi elit id massa.
        </Text>
        <Text variant={'header_3'} style={styles.header3}>
          2. Dữ liệu cá nhân
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque
          aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id
          sapien. Vestibulum malesuada orci sit amet pretium facilisis. In
          lobortis congue augue, a commodo libero tincidunt scelerisque. Donec
          tempus congue lacinia. Phasellus lacinia felis est, placerat commodo
          odio tincidunt iaculis. Sed felis magna, iaculis a metus id,
          ullamcorper suscipit nulla. Fusce facilisis, nunc ultricies posuere
          porttitor, nisl lacus tincidunt diam, vel feugiat nisi elit id massa.
        </Text>
      </ScrollView>
    </HeaderBack>
  )
}

export default PrivacyDetail

const styles = StyleSheet.create({
  header3: {
    lineHeight: 32,
    marginTop: 20,
    marginBottom: 4,
  },
})
