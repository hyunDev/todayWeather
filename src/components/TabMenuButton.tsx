import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface TabMenuType {
  url: string
  title: string
  selected: string
  setSelected: (url: string) => void
}

const TabMenuButtonContainer = styled.div`
  width: 25%;
  height: 100%;
`

const StyledLink = styled(Link)`
  width: 100%;
`

const TabMenuButton = ({ url, title, selected, setSelected }: TabMenuType) => {
  const TabButton = styled.button`
    width: 100%;
    height: 100%;
    font-size: 16px;
    background-color: ${({ theme }) =>
      url === selected
        ? theme.color.tabMenu.selected
        : theme.color.tabMenu.default};
    border: 1px solid lightgray;
  `

  return (
    <TabMenuButtonContainer onClick={() => setSelected(url)}>
      <StyledLink to={url}>
        <TabButton>{title}</TabButton>
      </StyledLink>
    </TabMenuButtonContainer>
  )
}

export default TabMenuButton
