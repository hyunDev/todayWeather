import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface LineChartProps {
  labels: string[]
  data: number[]
  labelTitle: string
}

const LineChart = ({ labels, data, labelTitle }: LineChartProps) => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: labels,
    datasets: [
      {
        label: labelTitle,
        data: data,
        borderColor: 'red',
        fill: false,
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
          borderColor: 'red',
          fill: false,
        },
      ],
    })
  }, [labels, data, labelTitle])

  return <Line options={options} data={chartData} />
}

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

export default LineChart
