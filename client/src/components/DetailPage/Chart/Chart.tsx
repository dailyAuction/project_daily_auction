import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';
import { ProductDetailRealtimeResp } from '../../../types/product.type';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title);

type ChartProps = {
  realTimeData: Partial<ProductDetailRealtimeResp>;
};

export const Chart = ({ realTimeData }: ChartProps) => {
  const { history } = realTimeData;

  // 차트 데이터는 data 상태가 업데이트 될 때마다 새롭게 계산됩니다. (다시 계산되어 화면에 렌더링합니다!)
  const chartData = useMemo(
    () => ({
      labels: history,
      datasets: [
        {
          label: '입찰가 추이',
          data: history,
          borderColor: '#F0A500',
          backgroundColor: '#F0A500',
        },
      ],
    }),
    [history]
  );

  // 옵션값도 메모이제이션합니다.
  const options = useMemo(
    () => ({
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
    }),
    []
  );

  // TODO: 차트 반응형 적용
  return (
    // 이전 차트와 다른 차트 렌더링 위해 key 값 지정
    <section key={realTimeData.boardId} className="flex flex-col space-y-2 w-full justify-center relative">
      <Line options={options} data={chartData} className="h-full bg-white px-2 w-full" />
    </section>
  );
};
