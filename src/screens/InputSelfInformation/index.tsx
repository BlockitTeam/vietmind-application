import React from 'react';
import {
  Box,
  Input,
  Button,
  FormControl,
  Select,
  CheckIcon,
  VStack,
  Text,
  HStack,
  ChevronDownIcon,
  Center,
} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@routes/navigator';
import {usePutEditUser} from '@hooks/auth';
import {tPutEditUserParam} from '@hooks/auth/auth.interface';
import axios from 'axios';
import {useAtom} from 'jotai';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
// import {useGetQuestion} from '@hooks/auth';

const curYear = new Date().getFullYear();
const listYear = Array.from({length: 120}, (_, i) => curYear - i).map(
  year => year,
);

type InputSelfInformationProps = NativeStackScreenProps<
  IRootStackParamList,
  'InputSelfInformation'
>;
type tFormEditUser = Omit<tPutEditUserParam, 'birthYear'> & {birthYear: string};
const InputSelfInformation: React.FC<InputSelfInformationProps> = props => {
  const {navigation} = props;

  const [_, setCurUser] = useAtom(curUserAtom);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<tFormEditUser>({
    mode: 'onChange',
    defaultValues: {
      lastName: '',
      firstName: '',
      birthYear: '',
      gender: 'MALE',
    },
  });

  // Todo: API
  const usePutEditUserMutation = usePutEditUser();

  //Todo: Func
  const onSubmit = async (data: tFormEditUser) => {
    usePutEditUserMutation.mutate(
      {...data, birthYear: parseInt(data.birthYear)},
      {
        onSuccess: value => {
          console.log('🚀 ~ onSubmit ~ value:', value);
          setCurUser(value.data);
        },
        onError: error => {
          console.log('🚀 ~ onSubmit ~ error:', error);
        },
      },
    );
  };

  return (
    <SafeAreaView>
      <Box w="90%" m={'auto'}>
        <VStack space={4}>
          <Text textAlign={'center'} variant={'header_2'}>
            Thông tin cá nhân
          </Text>
          <Text
            variant={'body_medium_regular'}
            w={300}
            textAlign={'center'}
            mb={2}
            m={'auto'}>
            Bạn vui lòng cung cấp tên, tuổi để Vietmind tiện xưng hô nhé
          </Text>
          <HStack space={2}>
            <Box flex={1}>
              <FormControl isRequired isInvalid={'lastName' in errors}>
                <FormControl.Label fontFamily={'SFProDisplay'}>
                  <Text>Họ</Text>
                </FormControl.Label>
                <Controller
                  control={control}
                  rules={{required: 'Họ là bắt buộc'}}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Họ"
                    />
                  )}
                  name="lastName"
                />
                {'lastName' in errors && errors.lastName && (
                  <FormControl.ErrorMessage>
                    {errors.lastName.message}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box flex={1}>
              <FormControl isRequired isInvalid={'firstName' in errors}>
                <FormControl.Label fontFamily={'SFProDisplay'}>
                  <Text>Tên</Text>
                </FormControl.Label>
                <Controller
                  control={control}
                  rules={{required: 'Tên là bắt buộc'}}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Tên"
                    />
                  )}
                  name="firstName"
                />
                {'firstName' in errors && errors.firstName && (
                  <FormControl.ErrorMessage>
                    {errors.firstName.message}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            </Box>
          </HStack>

          <FormControl isRequired isInvalid={'birthYear' in errors}>
            <FormControl.Label fontFamily={'SFProDisplay'}>
              <Text>Năm sinh</Text>
            </FormControl.Label>
            <Controller
              control={control}
              rules={{required: 'Năm sinh là bắt buộc'}}
              render={({field: {onChange, onBlur, value}}) => (
                <Select
                  minWidth="200"
                  accessibilityLabel="Chọn năm sinh"
                  placeholder="Chọn năm sinh"
                  onValueChange={onChange}
                  selectedValue={value}
                  dropdownIcon={
                    <Center px={2}>
                      <ChevronDownIcon />
                    </Center>
                  }
                  _selectedItem={{
                    bg: 'primary.600',
                    endIcon: <CheckIcon size="5" />,
                  }}>
                  {listYear.map(item => {
                    return (
                      <Select.Item
                        key={item}
                        label={item.toString()}
                        value={item.toString()}
                      />
                    );
                  })}
                </Select>
              )}
              name="birthYear"
            />
            {'birthYear' in errors && errors.birthYear && (
              <FormControl.ErrorMessage>
                {errors.birthYear.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={'gender' in errors}>
            <FormControl.Label fontFamily={'SFProDisplay'}>
              <Text>Giới tính</Text>
            </FormControl.Label>
            <Controller
              control={control}
              rules={{required: 'Giới tính là bắt buộc'}}
              render={({field: {onChange, onBlur, value}}) => (
                <Select
                  minWidth="200"
                  accessibilityLabel="Chọn giới tính"
                  placeholder="Chọn giới tính"
                  onValueChange={onChange}
                  selectedValue={value}
                  defaultValue={value}
                  dropdownIcon={
                    <Center px={2}>
                      <ChevronDownIcon />
                    </Center>
                  }
                  _selectedItem={{
                    bg: 'primary.600',
                    endIcon: <CheckIcon size="5" />,
                  }}>
                  <Select.Item label="Nam" value="MALE" />
                  <Select.Item label="Nữ" value="FEMALE" />
                  <Select.Item label="Khác" value="OTHER" />
                </Select>
              )}
              name="gender"
            />
            {'gender' in errors && errors.gender && (
              <FormControl.ErrorMessage>
                {errors.gender.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>

          <Button
            onPress={handleSubmit(onSubmit)}
            variant={'cusPrimary'}
            isDisabled={!isValid}>
            Tiếp tục
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default InputSelfInformation;
