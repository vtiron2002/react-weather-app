export default (state, action) => {
  const set = (data) => ({ ...state, ...data });
  switch (action.type) {
    case "HANDLE_CHANGE":
      return set({ [action.payload.key]: action.payload.value });
    case "ON_SEARCH_FAIL":
      return set({ error: action.payload.error });
    case "ON_SEARCH_SUCCESS":
      return set({
        error: null,
        weatherData: action.payload,
        selectedDay: action.payload.forecast.forecastday[0],
      });
    case "GO_BACK":
      return set({ error: null, weatherData: null });
    case "SELECT_DAY":
      return set({
        selectedDay:
          state.weatherData.forecast.forecastday[action.payload.dayIndex],
      });
    case "GEO_LOCATION_SEARCH":
      return set({
        error: null,
        weatherData: action.payload.data,
        selectedDay: action.payload.data.forecast.forecastday[0],
        locationSearch: action.payload.search
      });
    default:
      return state;
  }
};
