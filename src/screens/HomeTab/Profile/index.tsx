import {TouchableOpacity} from 'react-native'
import {
  Avatar,
  Button,
  Divider,
  HStack,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from 'native-base'
import HeaderBack from '@components/layout/HeaderBack'
import {Pencil} from '@assets/icons'
import {clearResult, useGetResponseResultDetail} from '@hooks/response'
import {useLogoutMutation} from '@hooks/auth'
import {useAtom} from 'jotai'
import {curUserAtom} from '@services/jotaiStorage/curUserAtom'
import {removeJSessionID} from '@services/asyncStorage/jsessionID'
import {resultCommonFilterAtom} from '@services/jotaiStorage/resltCommonFilter'
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import {IBottomParamList, IRootStackParamList} from '@routes/navigator'
import {CompositeScreenProps} from '@react-navigation/native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {TOAST_PLACEMENT} from 'src/constants'
import ProfileSurveyButton from './components/ProfileSurveyButton'
import ListSurveyDetail from './ProfileMultipleChoice/ListSurveyDetail'
type Tab_ProfileProps = CompositeScreenProps<
  BottomTabScreenProps<IBottomParamList, 'Profile'>,
  NativeStackScreenProps<IRootStackParamList>
>

const Tab_Profile: React.FC<Tab_ProfileProps> = ({navigation}) => {
  const toast = useToast()
  const {mutate: clearRes} = clearResult()
  const [curUser, setCurUser] = useAtom(curUserAtom)

  const {data: dataResponseResultDetail, isLoading: isResResultDetailLoading} =
    useGetResponseResultDetail()
  const [, setResultCommonFilter] = useAtom(resultCommonFilterAtom)
  const useLogout = useLogoutMutation()
  const logout = async () => {
    useLogout.mutate(undefined, {
      onSuccess: async () => {
        await Promise.all([
          setResultCommonFilter(undefined),
          setCurUser(undefined),
          removeJSessionID(),
        ])
        toast.show({
          title: 'Đăng xuất thành công!',
          duration: 2000,
          placement: TOAST_PLACEMENT,
        })
      },
    })
  }

  const isListSurveyDetailLoading =
    !curUser || isResResultDetailLoading || !dataResponseResultDetail?.data
  return (
    <HeaderBack title="Thông tin cá nhân">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack alignItems={'center'} w={'100%'} minHeight={'100%'} pt={4}>
          <>
            <Avatar bg="green.500" mr="1" w={100} h={100} />
            <Text
              variant={
                'sf_header_3'
              }>{`${curUser?.lastName} ${curUser?.firstName}`}</Text>
            <Text
              variant={'body_medium_regular'}
              color={'text.neutral_secondary'}>
              {`${curUser?.gender} - ${curUser?.birthYear}`}
            </Text>
            <Button
              variant={'cusOutline'}
              h={'32px'}
              px={'12px'}
              py="0px"
              mb={'28px'}
              onPress={() => {
                navigation.navigate('ChangeProfile')
              }}>
              <HStack alignItems={'center'} space={2}>
                <Pencil />
                <Text variant={'body_small_bold'}>Thay đổi thông tin</Text>
              </HStack>
            </Button>
          </>
          {/* End: Basic information ----- Top */}

          <VStack w={'100%'} space={2}>
            {isListSurveyDetailLoading ? (
              <Skeleton h={'70.5px'} />
            ) : (
              <ProfileSurveyButton
                name="Trắc nghiệm sàn lọc chung"
                date="16/11/2024"
                onClickCallBack={() => {
                  navigation.navigate('GeneralSurveyResult', {
                    title: 'Sàn lọc chung',
                    res: dataResponseResultDetail.data,
                  })
                }}
              />
            )}

            {isListSurveyDetailLoading ? (
              <Skeleton h={'70.5px'} />
            ) : (
              <ListSurveyDetail idSur={curUser?.surveyDetail} />
            )}
          </VStack>

          <Divider w={'100%'} my={'16px'} bgColor={'background.medium'} />

          <VStack alignSelf={'flex-start'} space={4}>
            <TouchableOpacity onPress={logout}>
              <Text variant={'body_large_bold'} color={'error.error_dark'}>
                Đăng xuất
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
              <Text
                variant={'body_large_bold'}
                color={'error.error_dark'}
                onPress={() => {
                  clearRes()
                }}>
                Clear Result
              </Text>
            </TouchableOpacity>
          </VStack>
        </VStack>
      </ScrollView>
    </HeaderBack>
  )
}

export default Tab_Profile
