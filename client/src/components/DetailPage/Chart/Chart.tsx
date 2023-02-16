import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState } from 'react';

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

// TODO: 웹소켓 적용하여 data 및 chartData 실시간 업데이트 구현

export const Chart = ({ initData }) => {
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
  // FIXME: 반응형으로 화면 크기 바뀔 때 너비가 달라지지 않는 현상 있음.
  // FIXME: 컴포넌트 마운트, 언마운트시에 제대로 렌더링되도록 useEffect 적용 필요해보임.
  return (
    <section className="flex flex-col space-y-2 w-full justify-center">
      <Line options={options} data={chartData} className="h-full bg-white px-2 w-full" />
    </section>
  );
};
