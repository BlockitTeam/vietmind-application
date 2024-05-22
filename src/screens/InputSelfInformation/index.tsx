import React from 'react';
import {
  Box,
  Button,
  Center,
  ChevronDownIcon,
  Column,
  HStack,
  Input,
  Row,
  Select,
  Text,
  VStack,
} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import SelectSearch from '@components/SelectSearch';

// Define the interface for your form data
interface FormData {
  firstName: string;
  lastName: string;
  date: number;
  gender: string;
}

const InputSelfInformation = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      date: 2024,
      gender: 'male',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    // Handle form submission here (e.g., send data to server)
  };
  console.log(errors);

  return (
    <SafeAreaView>
      <VStack
        position={'relative'}
        alignItems={'center'}
        mx={'16px'}
        space={4}
        minH={'full'}
        pt={4}>
        <Text variant={'header_2'}>Thông tin cá nhân</Text>
        <Text
          variant={'body_medium_regular'}
          w={300}
          textAlign={'center'}
          mb={2}>
          Bạn vui lòng cung cấp tên, tuổi để Vietmind tiện xưng hô nhé
        </Text>
        <HStack space={2}>
          <Controller
            control={control}
            rules={{
              required: 'Họ là bắt buộc',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Input
                  h={'40px'}
                  placeholder="Họ"
                  flex={1}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors?.firstName && <Text>{errors.firstName.message}</Text>}
              </>
            )}
            name="firstName"
          />

          <Controller
            control={control}
            rules={{
              required: 'Tên là bắt buộc',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                h={'40px'}
                placeholder="Tên"
                flex={1}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text>{errors.lastName.message}</Text>}
        </HStack>

        {/* Assuming you want to validate year (could be birth year): */}
        <Controller
          control={control}
          rules={{
            required: 'Năm sinh là bắt buộc',
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Select
              w={'full'}
              h={'40px'}
              placeholder="Chọn năm sinh"
              defaultValue={value.toString()}
              onValueChange={onChange}
              dropdownIcon={
                <Center px={4}>
                  <ChevronDownIcon />
                </Center>
              }>
              {Array.from({length: 100}, (_, i) => i + 1924).map(year => (
                <Select.Item
                  key={year}
                  label={year.toString()}
                  value={year.toString()}
                />
              ))}
            </Select>
          )}
          name="date"
        />
        {errors.date && <Text>{errors.date.message}</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Select
              w={'full'}
              h={'40px'}
              dropdownIcon={
                <Center px={4}>
                  <ChevronDownIcon />
                </Center>
              }
              placeholder="Chọn giới tính"
              onValueChange={onChange}
              onClose={onBlur}
              defaultValue={value}>
              <Select.Item label="Nam" value="male" />
              <Select.Item label="Nữ" value="female" />
            </Select>
          )}
          name="gender"
        />
        {errors.gender && <Text>This is required.</Text>}
        <Button
          w={'full'}
          position={'absolute'}
          bottom={'32px'}
          onPress={handleSubmit(onSubmit)}
          variant={'cusPrimary'}
          disabled={Object.values(errors).length >= 1 ? true : false}>
          Tiếp tục
        </Button>
        <SelectSearch />
      </VStack>
    </SafeAreaView>
  );
};

export default InputSelfInformation;

// const styles = StyleSheet.create({});
