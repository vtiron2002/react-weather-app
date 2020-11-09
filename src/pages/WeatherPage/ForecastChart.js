import React from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useWeatherState } from "../../store/Context";
import { Card } from "../../StyledComponents/StyledComponents";
import { CtoF, hourFormatter } from "../../utils";

const StyledChart = styled(Card)``;

const ChartOptions = {
  legend: {
    display: false,
  },
  maintainAspectRatio: true,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: (tooltipItem) => Math.round(tooltipItem.value) + "°F",
      title: ([{ xLabel }]) => hourFormatter(xLabel),
    },
  },
  scales: {
    xAxes: [
      {
        ticks: {
          callback: (value) => hourFormatter(value),
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          callback: (value) => value + "°F",
        },
      },
    ],
  },
};

const ForecastChart = () => {
  const [state, dispatch] = useWeatherState();
  const { weatherData, selectedDay } = state;

  return (
    <StyledChart>
      <Line
        data={{
          labels: selectedDay.hour.map((h) => new Date(h.time).getHours()),
          datasets: [
            {
              data: selectedDay.hour.map((h) => ({
                x: new Date(h.time).getHours(),
                y: CtoF(h.temp_c),
              })),
              backgroundColor: "rgba(255, 255, 255, .7)",
              borderColor: "rgba(255,255,255)",
              pointBackgroundColor: "#3a6eb4",
              pointBorderColor: "#3a6eb4",
            },
          ],
        }}
        options={ChartOptions}
      />
    </StyledChart>
  );
};

export default ForecastChart;
