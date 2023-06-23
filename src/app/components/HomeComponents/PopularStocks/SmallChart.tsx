"use client";

import { ChartData } from "./Stock";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart, Line } from "react-chartjs-2";
ChartJS.register(...registerables);

export default function SmallChart({ stockData }: { stockData: ChartData[] }) {
  // convert histrocial data to the format that the chart can read
  // render change bg color based on todays change, if it is up, use green, if it is down, use red
  const todaysChange = stockData[0].change;

  return (
    <div className="w-full h-16 overflow-clip">
      <Line
        options={{
          responsive: true,
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
          //   disable legend
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        data={{
          labels: stockData.map((data) => data.date),
          datasets: [
            {
              data: stockData.map((data) => data.close),

              fill: "start",
              //   disable points
              pointRadius: 0,
              //   disable lines
              borderWidth: 1,
              pointBorderColor: "#12d",
              //   change line color based on todays change
              borderColor: todaysChange > 0 ? "#10B981" : "#EF4444",
              backgroundColor: "transparent",
            },
          ],
        }}
      />
    </div>
  );
}
