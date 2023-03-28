import { AppRouter } from '@acme/api';
import { inferProcedureOutput } from '@trpc/server';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
  elements: {
    point: {
      radius: 1,

    }
  },
  scales: {
    x: {
      display: false
    },
    y: {
      display: false
    }
  }
};

export const SessionCard: React.FC<{
  session: inferProcedureOutput<AppRouter['session']['recentWithDisplayData']>[number];
}> = ({ session }) => {
  return (
    <div className="px-10 flex flex-row py-4 justify-between transition-all hover:scale-[101%] border-b-2">
      <div className='flex flex-col'>
        <h2 className="text-2xl font-bold">
          {session.name}
        </h2>
        <p className='text-gray-500'>{session.id}</p>
      </div>
      <div className='ml-5 h-20'>
        <Line
          options={options}
          data={{
            labels: session.accelerationX.map((_, i) => i),
            datasets: [
              {
                label: 'Dataset 1',
                data: session.accelerationX,
                borderColor: '#19489f',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
