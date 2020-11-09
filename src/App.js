import React, { useEffect } from "react";
import { coordsToLocation, getWeather } from "./api";
import LoadingPage from "./pages/LoadingPage";
import SearchPage from "./pages/SearchPage";
import WeatherPage from "./pages/WeatherPage/WeatherPage";
import { useWeatherState } from "./store/Context";

const App = () => {
  const [state, dispatch] = useWeatherState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      dispatch({ type: "START_SEARCH" });
      const location = await coordsToLocation({
        lat: coords.latitude,
        long: coords.longitude,
      });
      const data = await getWeather(location);
      dispatch({
        type: "GEO_LOCATION_SEARCH",
        payload: { data, search: location },
      });
    });
  }, []);

  if (state.loading) return <LoadingPage />;
  if (!state.weatherData) return <SearchPage />;

  return <WeatherPage />;
};

export default App;
