import React, { useState, useEffect, useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  labels: string[]
  data: number[]
  labelTitle: string
  address: string
  unit: string
}

const BarChart = ({
  labels,
  data,
  labelTitle,
  address,
  unit,
}: BarChartProps) => {
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: labels,
    datasets: [
      {
        label: labelTitle,
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  })
  const optionsData: ChartOptions<'bar'> = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: address,
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            align: 'end',
            color: '#525CEB',
            font: {
              size: 12,
              family: "'Noto Sans KR', sans-serif",
              weight: 500,
            },
            text: unit,
          },
        },
      },
    }),
    [address, unit]
  )
  const [options, setOptions] = useState<ChartOptions<'bar'>>(optionsData)

  useEffect(() => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: labelTitle,
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    })
    setOptions(optionsData)
  }, [labels, data, labelTitle, optionsData])

  return <Bar options={options} data={chartData} />
}

export default BarChart
