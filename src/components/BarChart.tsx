import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
}

interface BarChartProps {
  labels: string[]
  data: number[]
  labelTitle: string
}

const BarChart = ({ labels, data, labelTitle }: BarChartProps) => {
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
  }, [labels, data, labelTitle])

  return <Bar options={options} data={chartData} />
}

export default BarChart
