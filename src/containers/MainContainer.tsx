// library
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
// state
import { RootState } from '../redux/store'
import {
  fetchXYCoordinateBySelect,
  setSearchInputValue,
  setAddress,
} from '../redux/city/citySlice'
// container
import CitySelectSet from './CitySelectSet'
import WeatherChartContainer from './WeatherChartContainer'
import CitySearchContainer from './CitySearchContainer'
// type
import { Coordinate, Option } from '../type/cityType'
// component
import Title from '../components/Title'

const MainContainerLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const MainLayout = styled.div`
  padding: 10px;
  width: 100%;
  height: fit-content;
  min-width: 300px;
  min-height: 250px;
  max-width: 600px;
  max-height: 500px;
  border: 1px solid ${({ theme }) => theme.color.main.border};
  box-shadow: 7px 3.5px 3.5px ${({ theme }) => theme.color.main.shadow};
  margin: 20px;
`
const MainContainer: React.FC = () => {
  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)

  const dispatch = useDispatch()
  const {
    firstSelectValue,
    secondSelectValue,
    thirdSelectValue,
    xyCoordinate,
  } = useSelector((state: RootState) => state.city)

  useEffect(() => {
    if (isFullAddress(firstSelectValue, secondSelectValue, thirdSelectValue)) {
      dispatch(
        fetchXYCoordinateBySelect([
          firstSelectValue.label,
          secondSelectValue.label,
          thirdSelectValue.label,
        ])
      )
      dispatch(
        setAddress(
          `${firstSelectValue.label} ${secondSelectValue.label} ${thirdSelectValue.label}`
        )
      )
      dispatch(setSearchInputValue(''))
    }
  }, [dispatch, firstSelectValue, secondSelectValue, thirdSelectValue])

  useEffect(() => {
    if (xyCoordinate.x !== 0 && xyCoordinate.y !== 0) {
      const [x, y] = changeXY(xyCoordinate)
      setX(x)
      setY(y)
    }
  }, [dispatch, xyCoordinate])

  const changeXY = (xyCoordinate: Coordinate) => {
    const RE = 6371.00877 // 지구 반경(km)
    const GRID = 5.0 // 격자 간격(km)
    const SLAT1 = 30.0 // 투영 위도1(degree)
    const SLAT2 = 60.0 // 투영 위도2(degree)
    const OLON = 126.0 // 기준점 경도(degree)
    const OLAT = 38.0 // 기준점 위도(degree)
    const XO = 43 // 기준점 X좌표(GRID)
    const YO = 136 // 기1준점 Y좌표(GRID)
    //
    // LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
    //
    const DEGRAD = Math.PI / 180.0
    //var RADDEG = 180.0 / Math.PI;

    const re = RE / GRID
    const slat1 = SLAT1 * DEGRAD
    const slat2 = SLAT2 * DEGRAD
    const olon = OLON * DEGRAD
    const olat = OLAT * DEGRAD

    let sn =
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
      Math.tan(Math.PI * 0.25 + slat1 * 0.5)
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn)
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5)
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5)
    ro = (re * sf) / Math.pow(ro, sn)

    const v1 = xyCoordinate.y
    const v2 = xyCoordinate.x
    let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5)
    ra = (re * sf) / Math.pow(ra, sn)
    let theta = v2 * DEGRAD - olon
    if (theta > Math.PI) theta -= 2.0 * Math.PI
    if (theta < -Math.PI) theta += 2.0 * Math.PI
    theta *= sn
    const x = Math.floor(ra * Math.sin(theta) + XO + 0.5)
    const y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5)
    return [x, y]
  }

  const isFullAddress = (add1: Option, add2: Option, add3: Option) => {
    if (add1.label !== '' && add2.label !== '' && add3.label !== '') {
      return true
    } else {
      return false
    }
  }
  return (
    <MainContainerLayout>
      <MainLayout>
        <Title value="오늘의 날씨" />
        <CitySelectSet
          firstSelectValue={firstSelectValue}
          secondSelectValue={secondSelectValue}
          thirdSelectValue={thirdSelectValue}
        />
        <CitySearchContainer />
        <WeatherChartContainer x={x} y={y} />
      </MainLayout>
    </MainContainerLayout>
  )
}

export default MainContainer
