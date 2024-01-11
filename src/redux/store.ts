// src/redux/store.ts
// 모든 slice로 부터 reducer들을 합침
import { configureStore } from '@reduxjs/toolkit'
import cityReducer from './city/citySlice'
import weatherReducer from './weather/weatherSlice'
const store = configureStore({
  reducer: {
    city: cityReducer,
    weather: weatherReducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),

  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export default store
