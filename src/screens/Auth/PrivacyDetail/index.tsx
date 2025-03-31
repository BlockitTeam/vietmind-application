import {StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import {
  Box,
  Center,
  ChevronLeftIcon,
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
            <Text ml={'2px'} mt="4px">
              Quay lại
            </Text>
          </Center>
        </TouchableOpacity>
      }>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {/* <Text
          variant={'sf_header_2'}
          width={270}
          textAlign={'center'}
          alignSelf={'center'}>
          Quyền riêng tư & Dữ liệu cá nhân
        </Text> */}
        <Box mx="auto" my={5}>
          <Text textAlign="center" variant={'sf_header_3'}>
            CÁC ĐIỀU KHOẢN VÀ ĐIỀU KIỆN SỬ DỤNG VIETMIND
          </Text>

          <VStack space={2} mt={4}>
            <Box>
              <Text variant={'body_medium_bold'}>1. Phạm vi áp dụng</Text>
              <Text variant={'body_small_regular'}>
                Các Điều Khoản Dịch Vụ này áp dụng cho việc bạn sử dụng trang
                web (vietmind.chat) hoặc ứng dụng di động (Vietmind).
              </Text>
            </Box>

            <Box>
              <Text variant="body_medium_bold">2. Người dùng đủ điều kiện</Text>
              <Text variant={'body_small_regular'}>
                Người dùng đủ điều kiện là những cá nhân đăng ký dịch vụ và được
                Vietmind phê duyệt để nhận dịch vụ. Bạn phải ít nhất 18 tuổi để
                sử dụng Ứng dụng.
              </Text>
            </Box>

            <Box>
              <Text variant="body_medium_bold">3. Ngôn ngữ sử dụng</Text>
              <Text variant={'body_small_regular'}>
                Ứng dụng có sẵn bằng tiếng Việt.
              </Text>
            </Box>

            <Box>
              <Text variant="body_medium_bold">4. Định nghĩa</Text>
              <Text variant={'body_small_regular'}>
                Khách hàng: Một cá nhân đăng ký dịch vụ và được Vietmind phê
                duyệt để nhận dịch vụ.
              </Text>
            </Box>

            <Box>
              <Text variant="body_medium_bold">5. Dịch vụ của Vietmind</Text>
              <Text variant={'body_small_regular'}>
                Vietmind sử dụng tin nhắn văn bản để hỗ trợ bạn. Chúng tôi không
                nhằm thay thế các cuộc tư vấn trực tiếp với bác sĩ hoặc bác sĩ
                tâm thần.
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box mx="auto" mb={5}>
          <Text textAlign="center" variant={'sf_header_2'} mb={3}>
            CHÍNH SÁCH BẢO MẬT
          </Text>

          <VStack space={4}>
            <Box>
              <Text variant={'body_medium_bold'}>
                1. Mục đích và phạm vi thu thập dữ liệu
              </Text>
              <Text variant={'body_small_regular'}>
                Chúng tôi hiểu rằng thông tin cá nhân và dữ liệu tâm lý của bạn
                là nhạy cảm và riêng tư.
              </Text>
            </Box>

            <Box>
              <Text variant={'body_medium_bold'}>
                2. Phương pháp thu thập và xử lý dữ liệu
              </Text>
              <Text variant={'body_small_regular'}>
                Dữ liệu được thu thập trực tiếp từ bạn hoặc tự động thông qua
                cookie và công nghệ theo dõi.
              </Text>
            </Box>

            <Box>
              <Text variant={'body_medium_bold'}>
                3. Sử dụng dữ liệu cho đào tạo AI
              </Text>
              <Text variant={'body_small_regular'}>
                Chúng tôi ưu tiên ẩn danh hoặc giảm thiểu thông tin cá nhân có
                thể nhận diện trước khi đưa dữ liệu vào các mô hình AI.
              </Text>
            </Box>
          </VStack>
        </Box>
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
