import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartConfiguration,
} from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { valueToRgbString } from '../../util/color';
import styles from './PingChart.module.scss';

export function PingChart(props: { timings: number[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<ChartConfiguration['data']>();

  useEffect(() => {
    const { timings } = props;
    const trimmedTimings = timings.slice(-100);
    const chartPoints = [
      ...new Array(100 - trimmedTimings.length).fill(undefined),
      ...trimmedTimings,
    ];
    const data: ChartConfiguration['data'] = {
      labels: new Array(100).fill(''),
      datasets: [
        {
          label: 'Ping',
          tension: 0.5,
          fill: true,
          data: chartPoints,
          segment: {
            borderColor(ctx) {
              const maxVal = Math.max(
                chartPoints[ctx.p0DataIndex],
                chartPoints[ctx.p1DataIndex]
              );
              return valueToRgbString(maxVal);
            },
          },
          pointBackgroundColor: chartPoints.map((point) =>
            valueToRgbString(point)
          ),
        },
      ],
    };

    setData(data);
  }, [props]);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!data) return;

    Chart.register(
      LineController,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement
    );

    const myChart = new Chart(canvasRef.current, {
      data: data,
      type: 'line',
      options: {
        animation: {
          duration: 0,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 500,
          },
        },
      },
    });

    return () => myChart.destroy();
  }, [data]);

  return (
    <div className={styles.pingChartContainer}>
      <canvas className={styles.pingCanvas} ref={canvasRef} />
    </div>
  );
}
