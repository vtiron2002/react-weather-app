export default (state, action) => {
  const set = (data) => ({ ...state, ...data });

  const searchAlreadyExistsInHistory = (what) =>
    state.locationSearchHistory.find((s) => s === what);

  switch (action.type) {
    case "HANDLE_CHANGE":
      return set({ [action.payload.key]: action.payload.value });
    case "ON_SEARCH_FAIL":
      return set({ error: action.payload.error, loading: false });
    case "ON_SEARCH_SUCCESS":
      return set({
        error: null,
        weatherData: action.payload,
        selectedDay: action.payload.forecast.forecastday[0],
        loading: false,
        locationSearchHistory: !searchAlreadyExistsInHistory(
          state.locationSearch,
        )
          ? [state.locationSearch, ...state.locationSearchHistory].slice(0, 3)
          : state.locationSearchHistory,
      });
    case "GO_BACK":
      return set({ error: null, weatherData: null, locationSearch: "" });
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
        locationSearch: action.payload.search,
        loading: false,
        locationSearchHistory: !searchAlreadyExistsInHistory(
          action.payload.search,
        )
          ? [action.payload.search, ...state.locationSearchHistory].slice(0, 3)
          : state.locationSearchHistory,
      });
    case "START_SEARCH":
      return set({
        loading: true,
      });
    case "SEARCH_FROM_HISTORY":
      return set({
        error: null,
        weatherData: action.payload.data,
        selectedDay: action.payload.data.forecast.forecastday[0],
        loading: false,
      });
    default:
      return state;
  }
};
