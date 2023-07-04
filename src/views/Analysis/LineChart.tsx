import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import { Line } from 'react-chartjs-2';


export interface LineChartProps{
  date:Date,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res:any,
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);






export function LineChart(props:LineChartProps) {
  const {date}=props
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Biểu đồ lượng mưa tính theo mm tháng ${dayjs(date).format('MM năm YYYY')}`,
      },
    },
  };
const labels = ["1","2","..."];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [100,200,131,140,120,142,52,513,12],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [100,140,120,200,131,142,52,513,12],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}
