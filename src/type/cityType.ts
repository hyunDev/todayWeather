import React, { ChangeEvent } from 'react'

export interface Option {
  value: string
  label: string
}

export interface Coordinate {
  x: number
  y: number
}

export interface CitySearchType {
  value: string
  items: CityDatas[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export interface CityDatas {
  address: string
  x: number
  y: number
}

export interface fetchXYCoordinateType {
  address: string[]
  mode: string
}
