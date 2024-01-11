import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import CitySelect from '../components/CitySelect'
import { PropsValue } from 'react-select'
import { Option } from '../type/cityType'
import {
  setFirstSelectValue,
  setSecondSelectValue,
  setThirdSelectValue,
  fetchFirstSelectOptions,
  fetchSecondSelectOptions,
  fetchThirdSelectOptions,
} from '../redux/city/citySlice'
import styled from 'styled-components'

const SelectContainer = styled.div`
  display: flex;
  width: 96%;
  margin: 0 2% 15px 2%;
  justify-content: space-between;
`

interface CitySelectSetType {
  firstSelectValue: Option
  secondSelectValue: Option
  thirdSelectValue: Option
}
const CitySelectSet: React.FC<CitySelectSetType> = React.memo(
  ({
    firstSelectValue,
    secondSelectValue,
    thirdSelectValue,
  }: CitySelectSetType) => {
    const dispatch = useDispatch()
    const { firstSelectOptions, secondSelectOptions, thirdSelectOptions } =
      useSelector((state: RootState) => state.city)

    useEffect(() => {
      dispatch(fetchFirstSelectOptions())
    }, [dispatch])

    useEffect(() => {
      // Initial fetch or generate options for the second select
      if (firstSelectValue.value !== '') {
        dispatch(fetchSecondSelectOptions(firstSelectValue))
      }
    }, [dispatch, firstSelectValue])

    useEffect(() => {
      // Initial fetch or generate options for the third select
      if (secondSelectValue.value !== '') {
        dispatch(fetchThirdSelectOptions([firstSelectValue, secondSelectValue]))
      }
    }, [dispatch, secondSelectValue])

    const handleFirstSelectChange = (
      selections: PropsValue<Option | Option[]>
    ) => {
      dispatch(setFirstSelectValue(selections))
      dispatch(setSecondSelectValue({ value: '', label: '' }))
      dispatch(setThirdSelectValue({ value: '', label: '' }))
    }

    const handleSecondSelectChange = (
      selections: PropsValue<Option | Option[]>
    ) => {
      dispatch(setSecondSelectValue(selections))
      dispatch(setThirdSelectValue({ value: '', label: '' }))
    }

    const handleThirdSelectChange = (
      selections: PropsValue<Option | Option[]>
    ) => {
      dispatch(setThirdSelectValue(selections))
    }

    return (
      <SelectContainer>
        <CitySelect
          value={firstSelectValue}
          options={firstSelectOptions}
          onChange={handleFirstSelectChange}
        />
        <CitySelect
          value={secondSelectValue}
          options={secondSelectOptions}
          onChange={handleSecondSelectChange}
        />
        <CitySelect
          value={thirdSelectValue}
          options={thirdSelectOptions}
          onChange={handleThirdSelectChange}
        />
      </SelectContainer>
    )
  }
)

export default CitySelectSet
