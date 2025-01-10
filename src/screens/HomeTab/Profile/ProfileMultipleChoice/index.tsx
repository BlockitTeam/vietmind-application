import HeaderBack from '@components/layout/HeaderBack'
import {ChevronLeftIcon, HStack, ScrollView, Text, VStack} from 'native-base'
import FilterButton from './components/FilterButton'
import {useGetSurveyResponseResult} from '@hooks/response'

import {useAtom} from 'jotai'
import {curUserAtom} from '@services/jotaiStorage/curUserAtom'
import ListSurveyDetail from './ListSurveyDetail'

const ProfileMultipleChoice = () => {
  const {data: dataSurveyResponse} = useGetSurveyResponseResult()
  const [curUser] = useAtom(curUserAtom)
  return (
    <HeaderBack
      title="Trắc nghiệm sàng lọc"
      buttonBack={
        <HStack alignItems={'center'} space={'2px'}>
          <ChevronLeftIcon />
          <Text color={'neutral.primary'}>Thoát</Text>
        </HStack>
      }>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <VStack space={2}>
          <Text variant={'sf_header_3'} textAlign={'center'} mt={2}>
            Trắc nghiệm sàng lọc
          </Text>

          {dataSurveyResponse?.data &&
            Object.entries(dataSurveyResponse?.data).map((i) => {
              return (
                <FilterButton key={i[0].toString()} label={i[0]} value={i[1]} />
              )
            })}

          <Text variant={'sf_header_3'} textAlign={'center'} mt={2}>
            Trắc nghiệm chuyên sâu
          </Text>

          <ListSurveyDetail idSur={curUser?.surveyDetail} />
        </VStack>
      </ScrollView>
    </HeaderBack>
  )
}

export default ProfileMultipleChoice
