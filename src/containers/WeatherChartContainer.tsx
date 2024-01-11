// library
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import styled from 'styled-components'
// component
import TabMenuButton from '../components/TabMenuButton'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
// redux
import { RootState } from '../redux/store'
import { fetchWeatherInfo } from '../redux/weather/weatherSlice'
// type
import { coordinate } from '../type/weatherType'

const TabContainer = styled.header`
  display: flex;
  margin: 0 2% 15px 2%;
  height: 35px;
`

const CanvasContainer = styled.div`
  position: absolute;
  margin: auto;
  width: 100%;
  height: 100%;
`

const WeatherChartContainer = React.memo(({ x, y }: coordinate) => {
  const [selected, setSelected] = useState<string>('')
  const {
    temperatureLabels,
    temperatureData,
    huminityLabels,
    huminityData,
    precipitationLabels,
    precipitationData,
    windLabels,
    windData,
  } = useSelector((state: RootState) => state.weather)

  const containerRef = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState<number | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchWeatherInfo({ x, y }))
  }, [dispatch, x, y])

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        if (containerRef.current.clientWidth > 0) {
          setLineHeight(containerRef.current.clientWidth / 2)
        }
      }
    }
    if (containerRef.current) {
      window.addEventListener('resize', handleResize)
      window.addEventListener('load', handleResize)
    }
    return () => {
      window.removeEventListener('load', handleResize)
      window.removeEventListener('resize', handleResize)
    }
  }, [containerRef])

  const ChartContainer = styled.div`
    position: relative;
    height: ${lineHeight}px;
  `

  /* const TabMenuButtonContainer = styled(TabMenuButton)`
    background-color: ${({ url, theme }) =>
      url === selected ? theme.color.true : theme.color.false};
  ` */

  return (
    <Router>
      <TabContainer>
        <TabMenuButton
          url="/LineChart"
          title="온도"
          selected={selected}
          setSelected={setSelected}
        />
        <TabMenuButton
          url="/HuminityBarChart"
          title="강수량"
          selected={selected}
          setSelected={setSelected}
        />
        <TabMenuButton
          url="/PrecipitationBarChart"
          title="습도"
          selected={selected}
          setSelected={setSelected}
        />
        <TabMenuButton
          url="/WindBarChart"
          title="바람"
          selected={selected}
          setSelected={setSelected}
        />
      </TabContainer>
      <ChartContainer>
        <CanvasContainer ref={containerRef}>
          <Routes>
            <Route
              path="/LineChart"
              element={
                <LineChart
                  labels={temperatureLabels}
                  data={temperatureData}
                  labelTitle="온도"
                />
              }
            />
            <Route
              path="/HuminityBarChart"
              element={
                <BarChart
                  labels={huminityLabels}
                  data={huminityData}
                  labelTitle="강수량"
                />
              }
            />
            <Route
              path="/PrecipitationBarChart"
              element={
                <BarChart
                  labels={precipitationLabels}
                  data={precipitationData}
                  labelTitle="습도"
                />
              }
            />
            <Route
              path="/WindBarChart"
              element={
                <BarChart
                  labels={windLabels}
                  data={windData}
                  labelTitle="바람"
                />
              }
            />
          </Routes>
        </CanvasContainer>
      </ChartContainer>
    </Router>
  )
})

export default WeatherChartContainer
