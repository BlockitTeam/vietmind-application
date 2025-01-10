import React, {useState} from 'react'
import {
  Box,
  Button,
  FlatList,
  Modal,
  Text,
  HStack,
  VStack,
  Pressable,
  Icon,
  IBoxProps,
  IButtonProps,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'native-base'
import {ListRenderItem} from 'react-native'

interface YearPickerProps {
  /**
   * Callback function called when a year is selected
   */
  onYearSelect?: (year: number) => void
  /**
   * The earliest year that can be selected
   * @default 1900
   */
  startYear?: number
  /**
   * The latest year that can be selected
   * @default current year
   */
  endYear?: number
  /**
   * Custom styles for the picker container
   */
  containerStyle?: IBoxProps
  /**
   * Custom styles for the year button
   */
  yearButtonStyle?: IButtonProps
  /**
   * Initial selected year
   * @default current year
   */
  initialYear?: number
}

interface YearItemProps {
  year: number
  isSelected: boolean
  onSelect: (year: number) => void
}

const YearItem: React.FC<YearItemProps> = ({year, isSelected, onSelect}) => (
  <Pressable onPress={() => onSelect(year)} w="45%" m="1">
    <Box
      bg={isSelected ? 'primary.500' : 'gray.100'}
      p="3"
      borderRadius="md"
      alignItems="center">
      <Text color={isSelected ? 'white' : 'gray.800'} fontSize="md">
        {year}
      </Text>
    </Box>
  </Pressable>
)

const YearPicker: React.FC<YearPickerProps> = ({
  onYearSelect,
  startYear = 1900,
  endYear = new Date().getFullYear(),
  containerStyle,
  yearButtonStyle,
  initialYear = new Date().getFullYear(),
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [decade, setDecade] = useState<number>(
    Math.floor(selectedYear / 10) * 10,
  )

  // Generate years for the current decade
  const years: number[] = Array.from({length: 10}, (_, i) => decade + i).filter(
    (year) => year >= startYear && year <= endYear,
  )

  const handleYearSelect = (year: number): void => {
    setSelectedYear(year)
    onYearSelect?.(year)
    setIsOpen(false)
  }

  const handlePreviousDecade = (): void => {
    setDecade((prev) => Math.max(startYear, prev - 10))
  }

  const handleNextDecade = (): void => {
    setDecade((prev) => Math.min(endYear - 9, prev + 10))
  }

  const renderYear: ListRenderItem<number> = ({item: year}) => (
    <YearItem
      year={year}
      isSelected={selectedYear === year}
      onSelect={handleYearSelect}
    />
  )

  return (
    <Box {...containerStyle}>
      <Pressable
        onPress={() => setIsOpen(true)}
        borderWidth={1}
        borderColor="gray.300"
        borderRadius="md"
        p="3"
        bg="white"
        {...yearButtonStyle}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="md">{selectedYear}</Text>
          <Text>▼</Text>
        </HStack>
      </Pressable>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <Modal.Content>
          <Modal.Header>Select Year</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <HStack justifyContent="space-between" alignItems="center">
                <Button
                  variant="ghost"
                  onPress={handlePreviousDecade}
                  isDisabled={decade <= startYear}
                  leftIcon={<Icon as={ChevronLeftIcon} />}>
                  Previous
                </Button>
                <Text fontSize="md">
                  {decade}-{decade + 9}
                </Text>
                <Button
                  variant="ghost"
                  onPress={handleNextDecade}
                  isDisabled={decade + 10 > endYear}
                  rightIcon={<Icon as={ChevronRightIcon} />}>
                  Next
                </Button>
              </HStack>

              <FlatList
                data={years}
                renderItem={renderYear}
                numColumns={2}
                keyExtractor={(item) => item.toString()}
                contentContainerStyle={{
                  paddingVertical: 8,
                }}
              />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  )
}

export default YearPicker
