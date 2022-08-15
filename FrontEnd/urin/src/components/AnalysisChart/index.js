import React, { useState } from "react";
import Chart from "react-apexcharts";

const AnalysisChart = (props) => {
  const [chart, setChart] = useState({
    options: {
      colors: ["#0244FC", "#868686"],
      chart: {
        id: "bar",
      },
      plotOptions: {
        bar: {
          barHeight: "30%",
          columnWidth: "20%",
          horizontal: true,
          dataLabels: {
            style: {
              fontSize: "20px",
              colors: ["#304758"],
            },
            position: "top",
          },
        },
      },
      xaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: ["category1", "category2"],
        max: 100,
      },
      dataLabels: {
        style: {
          fontSize: "15px",
          colors: ["#333333"],
        },
        position: "top",
        offsetX: 25,
      },
    },
    series: [
      {
        name: "나의 평균(%)",
        data: [56, 95],
      },
      {
        name: "합격자 평균(%)",
        data: [73, 42],
      },
    ],
  });

  return (
    <Chart
      options={chart.options}
      series={chart.series}
      type="bar"
      width="1070"
      height="300"
    />
  );
};

export default AnalysisChart;