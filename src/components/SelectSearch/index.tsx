import {StyleSheet} from 'react-native';
import React from 'react';
import {FormControl, Text, Input, Select} from 'native-base';

const curYear = new Date().getFullYear();

const listData = Array.from({length: 120}, (_, i) => curYear - i).map(
  year => year,
);
const SelectSearch = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  return (
    <Select
      variant="outline"
      //   selectedValue={selectedValue}
      _actionSheetBody={{
        ListHeaderComponent: (
          <Input
            px={15}
            py={2}
            fontSize={16}
            value={searchValue}
            placeholder=""
            //   _focus={{bg: colors.white['50'], borderColor: 'darkBlue.600'}}
            type="text"
            onChangeText={(value: string) => {
              setSearchValue(value);
            }}
          />
        ),
      }}>
      {listData.filter(item => {
        let tempItem = item.toString();
        if (tempItem.includes(searchValue)) {
          console.log(tempItem, '------');
          return (
            <>
              <Text>{tempItem} 1</Text>
              <Select.Item label={tempItem} value={tempItem} key={tempItem} />
            </>
          );
        }
      })}
      <Select.Item label="Nam" value="male" />
      <Select.Item label="Nữ" value="female" />
    </Select>
  );
};

export default SelectSearch;

const styles = StyleSheet.create({});
