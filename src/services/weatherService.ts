import axios from 'axios'
import { coordinate } from '../type/weatherType'

export const getWeatherInfo = async ({ x, y }: coordinate) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate() - 1

  const yesterday = `${year}${month >= 10 ? month : '0' + month}${
    date >= 10 ? date : '0' + date
  }`

  const apiKey =
    'w1r3V6uXM5WgLRj2NqNLMcc9TPl3Z%2Fgd4qPZo1CekVhQ16VGWiS2GvVT8liKlavNkSQBX6p1VFMPFxd85ib3fQ%3D%3D'
  const apiUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&pageNo=1&numOfRows=266&dataType=JSON&base_date=${yesterday}&base_time=2300&nx=${x}&ny=${y}`

  const response = await axios.get(apiUrl)
  return response.data
}
