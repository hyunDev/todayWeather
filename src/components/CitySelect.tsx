import React from 'react'
import Select, { PropsValue } from 'react-select'
import { Option } from '../type/cityType'
import styled from 'styled-components'

const SelectContainer = styled.div`
  width: 33%;
`
interface CitySelectType {
  value: PropsValue<Option | Option[]> | undefined
  options: Option[]
  onChange: (selections: PropsValue<Option | Option[]>) => void
}
const CitySelect = ({ value, options, onChange }: CitySelectType) => {
  return (
    <SelectContainer>
      <Select value={value} options={options} onChange={onChange} />
    </SelectContainer>
  )
}
export default CitySelect
