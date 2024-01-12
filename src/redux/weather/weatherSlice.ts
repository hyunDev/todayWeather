import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWeatherInfo } from '../../services/weatherService'
import { coordinate } from '../../type/weatherType'
const initialState: any = {
  temp: [],
}

export const fetchWeatherInfo = createAsyncThunk(
  'weather/Info/get',
  async ({ x, y }: coordinate) => {
    const weatherInfo: any = await getWeatherInfo({ x, y })
    return weatherInfo.response.body.items.item
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherInfo.fulfilled, (state, action) => {
      state.weatherInfo = action.payload
      state.temperatureOriginData = state.weatherInfo.filter(
        (item: any) => item.category === 'TMP'
      )
      state.huminityOriginData = state.weatherInfo.filter(
        (item: any) => item.category === 'RNI'
      )
      state.precipitationOriginData = state.weatherInfo.filter(
        (item: any) => item.category === 'REH'
      )
      state.windOriginData = state.weatherInfo.filter(
        (item: any) => item.category === 'UUU'
      )

      state.temperatureData = state.temperatureOriginData.map((item: any) =>
        parseFloat(item.fcstValue)
      )
      state.huminityData = state.huminityOriginData.map((item: any) =>
        parseFloat(item.fcstValue)
      )
      state.precipitationData = state.precipitationOriginData.map((item: any) =>
        parseFloat(item.fcstValue)
      )
      state.windData = state.windOriginData.map((item: any) =>
        parseFloat(item.fcstValue)
      )
      state.temperatureLabels = state.temperatureOriginData.map(
        (item: any) => `${item.fcstTime.slice(0, 2)} 시`
      )
      state.huminityLabels = state.huminityOriginData.map(
        (item: any) => `${item.fcstTime.slice(0, 2)} 시`
      )
      state.precipitationLabels = state.precipitationOriginData.map(
        (item: any) => `${item.fcstTime.slice(0, 2)} 시`
      )
      state.windLabels = state.windOriginData.map(
        (item: any) => `${item.fcstTime.slice(0, 2)} 시`
      )
    })
  },
})

export default weatherSlice.reducer
