import { Chart } from 'chart.js';
import { useEffect, useRef } from 'react';

export interface BarChartProps {
    data: number[];
}

export function BarChart(props: BarChartProps) {
    const { data } = props;
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          if (ctx) {
            const chartConfig = {
              type: 'bar',
              data: {
                labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
                datasets: [
                  {
                    label: 'My Dataset',
                    data: data,
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            } as Chart.ChartConfiguration;
    
            new Chart(ctx, chartConfig);
          }
        }
      }, [data]);

    return <canvas ref={chartRef} />;
}
