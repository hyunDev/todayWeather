import React from 'react'
import { CitySearchType } from '../type/cityType'
import styled from 'styled-components'

const SearchContainer = styled.div`
  width: 96%;
  height: 45px;
  position: relative;
  display: flex;
  border: 0;
  margin: 0 2% 0 2%;
`

const Search = styled.input`
  border: 0;
  background-color: ${({ theme }) => theme.color.search.input.background};
  padding-left: 10px;
  width: 100%;
  height: 100%;
  outline: none;
`

const AutoCompleteContainer = styled.div`
  z-index: 3;
  background-color: ${({ theme }) =>
    theme.color.search.autoComplete.background};
  height: 50vh;
  width: 400px;
  position: absolute;
  top: 45px;
  border: 2px solid ${({ theme }) => theme.color.search.autoComplete.border};
`

const AutoCompleteList = styled.ul`
  list-style-type: square;
`

const AutoCompleteListItem = styled.li`
  padding: 10px 8px;
  width: 90%;
  &::marker {
    color: ${({ theme }) => theme.color.search.autoCompleteList.marker};
    font-size: 0.9em;
    font-weight: bold;
  }
  font-size: 14px;
  color: ${({ theme }) => theme.color.search.autoCompleteList.font};
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  &:hover {
    background-color: ${({ theme }) =>
      theme.color.search.autoCompleteList.hover.background};
    cursor: pointer;
  }
  position: relative;
`

const CitySearch = ({ value, items, onChange, onClick }: CitySearchType) => {
  return (
    <SearchContainer>
      <Search
        type="text"
        value={value}
        onChange={onChange}
        placeholder="주소를 입력하세요"
      />
      {items.length > 0 && value && (
        <AutoCompleteContainer>
          <AutoCompleteList>
            {items.map((search, idx) => (
              <AutoCompleteListItem key={search.address} onClick={onClick}>
                {search.address}
              </AutoCompleteListItem>
            ))}
          </AutoCompleteList>
        </AutoCompleteContainer>
      )}
    </SearchContainer>
  )
}

export default CitySearch
