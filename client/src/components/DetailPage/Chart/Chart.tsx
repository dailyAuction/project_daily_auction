import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { ProductDetailRealtimeResp } from '../../../types/product.type';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '입찰가 추이',
    },
  },
};

type ChartProps = {
  initData: number[];
  realTimeData: ProductDetailRealtimeResp;
};

export const Chart = ({ realTimeData, initData }: ChartProps) => {
  const { history } = realTimeData;
  const [data, setData] = useState(initData);
  const [chartData, setChartData] = useState({
    labels: data,
    datasets: [
      {
        label: '입찰가 추이',
        data,
        borderColor: '#F0A500',
        backgroundColor: '#F0A500',
      },
    ],
  });

  useEffect(() => {
    if (history) setData(history);
  }, [history]);

  // FIXME: 반응형으로 화면 크기 바뀔 때 너비가 달라지지 않는 현상 있음.
  // FIXME: 컴포넌트 마운트, 언마운트시에 제대로 렌더링되도록 useEffect 적용 필요해보임.
  return (
    <section className="flex flex-col space-y-2 w-full justify-center">
      <Line options={options} data={chartData} className="h-full bg-white px-2 w-full" />
    </section>
  );
};
