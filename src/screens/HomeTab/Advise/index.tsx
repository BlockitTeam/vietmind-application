import {Platform, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useEffect, useLayoutEffect} from 'react'
import {Box, Center, Circle, HStack, Spacer, Text, VStack} from 'native-base'
import HeaderBack from '@components/layout/HeaderBack'
import {CompositeScreenProps} from '@react-navigation/native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import {IBottomParamList, IRootStackParamList} from '@routes/navigator'
import {useGetListDoctor} from '@hooks/user'
import {colors} from '@assets/colors'
import {useGetAppointment} from '@hooks/appointment/getAppointment'
import {useAtom} from 'jotai'
import {curUserAtom} from '@services/jotaiStorage/curUserAtom'

type Tab_AdviseProps = CompositeScreenProps<
  BottomTabScreenProps<IBottomParamList, 'Advise'>,
  NativeStackScreenProps<IRootStackParamList>
>

const Tab_Advise: React.FC<Tab_AdviseProps> = (props) => {
  const {navigation} = props
  const {data: dataListDoctor, isLoading: isListDoctorLoading} =
    useGetListDoctor()
  const {data: appointmentData, isLoading: isAppointmentLoading} =
    useGetAppointment()
  const [curUser] = useAtom(curUserAtom)
  useLayoutEffect(() => {
    if (typeof appointmentData?.data === 'string') {
      if (curUser?.surveyDetail === null) navigation.navigate('QuizResult')
      else navigation.navigate('DetailResult')
    }
  }, [navigation, appointmentData?.data])

  return appointmentData?.data === undefined ||
    isListDoctorLoading ||
    isAppointmentLoading ? (
    <></>
  ) : (
    <HeaderBack title="Tư vấn">
      <Box h={4} />
      <VStack space={2}>
        <Text variant={'body_large_bold'}>Danh sách bác sĩ</Text>

        {dataListDoctor?.data.map((item) => {
          return appointmentData?.data.doctorId === item.id ? (
            <TouchableOpacity
              key={item.id}
              style={styles.touchableOpacity__advise}
              onPress={() => {
                //Add dr information
                navigation.navigate('ChatWithProfessional_Start', {
                  drInformation: item,
                })
              }}>
              <HStack alignItems="center" space={'8px'}>
                <HStack flex={1} space={2} alignItems="center">
                  <Circle h="40px" w="40px" backgroundColor="primary.medium" />
                  <Box flex={1}>
                    <Text
                      variant={
                        Platform.OS === 'android'
                          ? 'body_medium_bold'
                          : 'body_medium_regular'
                      }
                      numberOfLines={
                        1
                      }>{`Bs. ${item.firstName} ${item.lastName}`}</Text>
                    <Text
                      variant={
                        Platform.OS === 'android' ? 'body_medium_regular' : ''
                      }
                      color="text.neutral_secondary"
                      numberOfLines={1}>
                      Bệnh viện bạch mai
                    </Text>
                  </Box>
                </HStack>
                <Center
                  borderColor="primary.medium"
                  borderWidth={1}
                  bgColor="white"
                  h="32px"
                  px="16px"
                  py="0px"
                  borderRadius="8px">
                  <Text variant="body_small_bold">Tư vấn ngay</Text>
                </Center>
              </HStack>
            </TouchableOpacity>
          ) : null
        })}
        <Box h={4} />
        {/* <Text variant={'body_large_bold'}>Tư vấn với chatbot</Text>
            <TouchableOpacity>
              <HStack alignItems={'center'}>
                <HStack flex={1} space={2} alignItems={'center'}>
                  <Circle h={10} w={10} backgroundColor={'primary.medium'} />
                  <VStack>
                    <Text>Tư vấn với AI Bot</Text>
                    <Text>24/7</Text>
                  </VStack>
                </HStack>
                <Box>Tư vấn ngay</Box>
              </HStack>
            </TouchableOpacity> */}
      </VStack>
    </HeaderBack>
  )
}

export default Tab_Advise

const styles = StyleSheet.create({
  touchableOpacity__advise: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.primary.light_medium,
    backgroundColor: colors.primary.light,
    paddingVertical: 13,
    paddingHorizontal: 12,
  },
})
