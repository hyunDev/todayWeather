// library
import React, { useState, ChangeEvent, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
// state
import { RootState } from '../redux/store'
import {
  fetchXYCoordinateBySearch,
  setFirstSelectValue,
  setSecondSelectValue,
  setThirdSelectValue,
} from '../redux/city/citySlice'
import {
  fetchCityItems,
  setSearchInputValue,
  setCityItems,
} from '../redux/city/citySlice'
// component
import CitySearch from '../components/CitySearch'

const SearchContainer = styled.div`
  margin-bottom: 15px;
`
const CitySearchContainer: React.FC = React.memo((value) => {
  // list에서 선택했는지, 선택했으면 리스트 갱신 x
  let isChoiced = useRef(false)
  let isSelectCityInList = useRef(false)
  const dispatch = useDispatch()
  // const [inputValue, setInputValue] = useState('')
  const { searchInputValue, cityItems } = useSelector(
    (state: RootState) => state.city
  )

  useEffect(() => {
    if (!isChoiced.current) {
      const debounce = setTimeout(() => {
        if (searchInputValue) dispatch(fetchCityItems(searchInputValue))
      }, 200)
      return () => {
        clearTimeout(debounce)
      }
    }
  }, [dispatch, searchInputValue])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isSelectCityInList.current) {
      isChoiced.current = false
    } else {
      isSelectCityInList.current = false
    }
    dispatch(setSearchInputValue(e.target.value))
  }

  // 리스트에서 선택
  const selectCityInList = (e: React.MouseEvent<HTMLElement>) => {
    isChoiced.current = true
    isSelectCityInList.current = true
    const liElement = e.target as HTMLLIElement
    const valueAttribute = liElement.innerHTML || ''
    dispatch(setSearchInputValue(valueAttribute))
    // 초기화
    dispatch(setCityItems([]))
    dispatch(fetchXYCoordinateBySearch(valueAttribute))
    dispatch(setFirstSelectValue({ value: '', label: '' }))
    dispatch(setSecondSelectValue({ value: '', label: '' }))
    dispatch(setThirdSelectValue({ value: '', label: '' }))
  }

  return (
    <SearchContainer>
      <CitySearch
        value={searchInputValue}
        items={cityItems}
        onClick={selectCityInList}
        onChange={onChange}
      />
    </SearchContainer>
  )
})

export default CitySearchContainer
