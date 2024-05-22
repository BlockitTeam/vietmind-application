import React from 'react';
import {
  NativeBaseProvider,
  Box,
  Input,
  Button,
  FormControl,
  Select,
  CheckIcon,
  VStack,
  Text,
  HStack,
} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';

const InputSelfInformation = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      lastName: '',
      firstName: '',
      yearOfBirth: '',
      gender: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
                <FormControl.Label>Họ</FormControl.Label>
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
                <FormControl.Label>Tên</FormControl.Label>
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

          <FormControl isRequired isInvalid={'yearOfBirth' in errors}>
            <FormControl.Label>Năm sinh</FormControl.Label>
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
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}>
                  <Select.Item label="1990" value="1990" />
                  <Select.Item label="1991" value="1991" />
                  <Select.Item label="1992" value="1992" />
                  <Select.Item label="1993" value="1993" />
                  <Select.Item label="1994" value="1994" />
                </Select>
              )}
              name="yearOfBirth"
            />
            {'yearOfBirth' in errors && errors.yearOfBirth && (
              <FormControl.ErrorMessage>
                {errors.yearOfBirth.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={'gender' in errors}>
            <FormControl.Label>Giới tính</FormControl.Label>
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
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}>
                  <Select.Item label="Nam" value="male" />
                  <Select.Item label="Nữ" value="female" />
                  <Select.Item label="Khác" value="other" />
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

          <Button onPress={handleSubmit(onSubmit)} isDisabled={!isValid}>
            Tiếp tục
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default InputSelfInformation;
