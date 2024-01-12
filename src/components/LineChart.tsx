import { useState, useEffect, useMemo } from 'react'
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
  ChartOptions,
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
  address: string
}

const LineChart = ({ labels, data, labelTitle, address }: LineChartProps) => {
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

  const optionData: ChartOptions<'line'> = useMemo(
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
          ticks: {
            stepSize: 1,
          },
          title: {
            display: true,
            align: 'end',
            color: '#525CEB',
            font: {
              size: 12,
              family: "'Noto Sans KR', sans-serif",
              weight: 500,
            },
            text: '단위: 도',
          },
        },
      },
    }),
    [address]
  )
  const [options, setOptions] = useState<ChartOptions<'line'>>(optionData)
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
    setOptions(optionData)
  }, [labels, data, labelTitle, optionData])

  return <Line options={options} data={chartData} />
}

export default LineChart
