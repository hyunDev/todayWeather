import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.Title.Font};
`
interface titleProps {
  value: string
}
const Title = ({ value }: titleProps) => {
  return <StyledTitle>{value}</StyledTitle>
}

export default React.memo(Title)
