import React, { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import initialState from "./initialState";

export const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  return (
    <WeatherContext.Provider value={[...useReducer(reducer, initialState)]}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherState = () => useContext(WeatherContext);

export default WeatherContextProvider;
