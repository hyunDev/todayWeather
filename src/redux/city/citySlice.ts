import { useDispatch } from 'react-redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Option, Coordinate, CityDatas } from '../../type/cityType'
import {
  getMainCityAddress,
  getSubCityAddress,
  getTertiaryCityAddress,
  getCityInfo,
} from '../../services/citySearchService'
interface CityState {
  firstSelectOptions: Option[]
  secondSelectOptions: Option[]
  thirdSelectOptions: Option[]
  firstSelectValue: Option
  secondSelectValue: Option
  thirdSelectValue: Option
  searchInputValue: string
  xyCoordinate: Coordinate
  cityItems: CityDatas[]
}

const initialState: CityState = {
  firstSelectOptions: [],
  secondSelectOptions: [],
  thirdSelectOptions: [],
  firstSelectValue: { value: '', label: '' },
  secondSelectValue: { value: '', label: '' },
  thirdSelectValue: { value: '', label: '' },
  searchInputValue: '',
  xyCoordinate: { x: 0, y: 0 },
  cityItems: [],
}

export const fetchFirstSelectOptions = createAsyncThunk(
  'city/fetchFirstSelectOptions',
  async () => {
    const newOptions: any = await getMainCityAddress()
    const newData: Option[] = newOptions.regcodes.map((item: any) => ({
      value: item.code,
      label: item.name,
    }))
    return newData
  }
)
export const fetchSecondSelectOptions = createAsyncThunk(
  'city/fetchSecondSelectOptions',
  async (firstSelectValue: Option) => {
    const code: string = firstSelectValue.value.slice(0, 2)
    const prefix = firstSelectValue.label
    const newOptions: any = await getSubCityAddress(code)
    const newData: Option[] = newOptions.regcodes
      .map((item: any) => ({
        value: item.code,
        label: item.name.replace(prefix, ''),
      }))
      .filter((item: any) => item.label !== '')
    return newData
  }
)

export const fetchThirdSelectOptions = createAsyncThunk(
  'city/fetchThirdSelectOptions',
  async (optionArray: Option[]) => {
    const code: string = optionArray[1].value.slice(0, 4)
    const prefix1 = optionArray[0].label
    const prefix2 = optionArray[1].label
    const newOptions: any = await getTertiaryCityAddress(code)
    const newData: Option[] = newOptions.regcodes
      .map((item: any) => ({
        value: item.code,
        label: item.name.replace(prefix1, '').replace(prefix2, ''),
      }))
      .filter((item: any) => item.label !== '')
    return newData
  }
)

export const fetchXYCoordinateBySearch = createAsyncThunk(
  'city/fetchXYCoordinateBySearch',
  async (address: string) => {
    const xyCoordiante: any = await getCityInfo(address)
    return xyCoordiante
  }
)

export const fetchXYCoordinateBySelect = createAsyncThunk(
  'city/fetchXYCoordinateBySelect',
  async (address: string[]) => {
    const xyCoordiante: any = await getCityInfo(address.join(' '))
    return xyCoordiante
  }
)

export const fetchCityItems = createAsyncThunk(
  'city/fetchCityItems',
  async (value: string) => {
    const response: any = await getCityInfo(value)
    return response
  }
)

const fetchXYCoordinateFulfilled = (state: any, action: any) => {
  if (action.payload) {
    const data = action.payload.data
    if (data && data.documents && data.documents.length > 0) {
      const addressData = data.documents[0]

      if (
        addressData &&
        typeof addressData.x !== 'undefined' &&
        typeof addressData.y !== 'undefined'
      ) {
        state.xyCoordinate = {
          x: Number(addressData.x),
          y: Number(addressData.y),
        }
      } else {
        console.error('Invalid addressData structure:', addressData)
      }
    } else {
      console.error('Invalid data structure:', data)
    }
  }
}
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setFirstSelectValue: (state, action) => {
      state.firstSelectValue = action.payload
      state.secondSelectOptions = []
      state.thirdSelectOptions = []
    },
    setSecondSelectValue: (state, action) => {
      state.secondSelectValue = action.payload
      state.thirdSelectOptions = []
    },
    setThirdSelectValue: (state, action) => {
      state.thirdSelectValue = action.payload
    },
    setSearchInputValue: (state, action) => {
      state.searchInputValue = action.payload
    },
    setCityItems: (state, action) => {
      state.cityItems = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirstSelectOptions.fulfilled, (state, action) => {
        state.firstSelectOptions = action.payload
      })
      .addCase(fetchSecondSelectOptions.fulfilled, (state, action) => {
        // state.loading = false
        state.secondSelectOptions = action.payload
      })
      .addCase(fetchThirdSelectOptions.fulfilled, (state, action) => {
        // state.loading = false
        state.thirdSelectOptions = action.payload
      })
      .addCase(fetchXYCoordinateBySearch.fulfilled, fetchXYCoordinateFulfilled)
      .addCase(fetchXYCoordinateBySelect.fulfilled, fetchXYCoordinateFulfilled)
      .addCase(fetchCityItems.fulfilled, (state, action) => {
        if (action.payload) {
          const data = action.payload.data
          if (data && data.documents && data.documents.length > 0) {
            const addressData = data.documents
            if (addressData.length !== 0) {
              state.cityItems = addressData.map((item: any) => ({
                address: item.address_name,
                x: item.x,
                y: item.y,
              }))
            }
          }
        }
      })
  },
})

export const {
  setFirstSelectValue,
  setSecondSelectValue,
  setThirdSelectValue,
  setSearchInputValue,
  setCityItems,
} = citySlice.actions

export default citySlice.reducer
