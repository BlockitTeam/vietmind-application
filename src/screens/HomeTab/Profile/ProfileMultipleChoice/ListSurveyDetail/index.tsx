import {Skeleton} from 'native-base'
import React from 'react'
import {useGetInfSurveyById} from '@hooks/survey'
import {IRootStackParamList} from '@routes/navigator'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import ProfileSurveyButton from '../../components/ProfileSurveyButton'

type ListSurveyDetailProps = {
  idSur: number | null | undefined
}

const ListSurveyDetail: React.FC<ListSurveyDetailProps> = ({idSur}) => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>()

  if (idSur !== null && idSur !== undefined) {
    const {data: dataSurvey, isLoading} = useGetInfSurveyById(idSur)

    if (isLoading) return <Skeleton h={'70.5px'} />
    if (!dataSurvey?.data) return null
    return (
      <ProfileSurveyButton
        name={dataSurvey.data.title + ' -  Trắc nghiệm chuyên sâu'}
        date="12/12/2021"
        onClickCallBack={() => {
          navigation.navigate('SurveyDetail', {infSurvey: dataSurvey.data})
        }}
      />
    )
  }

  return null
}

export default ListSurveyDetail
