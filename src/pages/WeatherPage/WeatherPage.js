import React from "react";
import { useWeatherState } from "../../store/Context";
import styled from "styled-components";
import { Card } from "../../StyledComponents/StyledComponents";
import ForecastChart from "./ForecastChart";

const StyledWeatherPage = styled.div`
  min-height: 100vh;
  background: rgb(58, 110, 180);
  background: linear-gradient(
    180deg,
    rgba(58, 110, 180, 1) 0%,
    rgba(15, 84, 182, 1) 58%,
    rgba(20, 94, 249, 1) 100%
  );
  padding: 2rem;

  .container {
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;

    > div {
      margin-bottom: 2rem;
    }
  }
`;

const StyledLocationName = styled(Card)`
  text-align: center;
`;

const StyledForecastDays = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    .dayName {
      font-weight: 100;
      font-size: clamp(1.3rem, 1vw, 1.5rem);
      margin-bottom: 0.5rem;
    }

    p {
      margin-bottom: 0.5rem;
      font-weight: 100;
      align-self: stretch;
      display: flex;
      justify-content: space-between;
      font-size: clamp(1rem, 1.5vw, 1.2rem);
    }
  }
`;

const StyledCurrentWeather = styled(Card)`
  display: flex;
  justify-content: space-around;
  align-items: center;

  .timeDate {
    display: flex;
    flex-direction: column;
    align-items: center;

    > p:first-child {
      margin-bottom: 1rem;
    }
  }

  .temp {
    font-size: clamp(2rem, 2vw, 4rem);
  }

  img {
    width: 7rem;
  }
`;

const WeatherPage = () => {
  const [state, dispatch] = useWeatherState();
  const { weatherData, selectedDay } = state;
  const { current, forecast, location } = weatherData;
  const { forecastday } = forecast;

  const goBack = () => dispatch({ type: "GO_BACK" });

  const selectDay = (dayIndex) => {
    dispatch({
      type: "SELECT_DAY",
      payload: {
        dayIndex,
      },
    });
  };

  return (
    <StyledWeatherPage>
      <div className="container">
        <StyledLocationName hover onClick={goBack}>
          {location.name}, {location.region} {location.country}
        </StyledLocationName>

        <StyledForecastDays>
          {forecastday.map((day, i) => {
            const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
            const dayName = days[new Date(day.date).getDay()];
            return (
              <Card
                hover
                active={selectedDay === forecastday[i]}
                key={day.date}
                onClick={() => selectDay(i)}
              >
                <h4 className="dayName">{dayName}</h4>
                <p>
                  High <span>{Math.round(day.day.maxtemp_f)}°F</span>
                </p>
                <p>
                  Low <span>{Math.round(day.day.mintemp_f)}°F</span>
                </p>
              </Card>
            );
          })}
        </StyledForecastDays>

        <StyledCurrentWeather>
          <div className="timeDate">
            <p>{new Date(current.last_updated).toLocaleDateString()}</p>
            <p>{new Date(current.last_updated).toLocaleTimeString()}</p>
          </div>
          <div className="temp">{current.temp_f}°F</div>
          <img src={current.condition.icon} alt="condition" />
        </StyledCurrentWeather>

        <ForecastChart />
      </div>
    </StyledWeatherPage>
  );
};

export default WeatherPage;
