import React from "react";
import styled from "styled-components";
import { getWeather } from "../api";
import { useWeatherState } from "../store/Context";
import { Card } from "../StyledComponents/StyledComponents";

const StyledSearchPage = styled.div`
  min-height: 100vh;
  background: rgb(58, 110, 180);
  background: linear-gradient(
    180deg,
    rgba(58, 110, 180, 1) 0%,
    rgba(15, 84, 182, 1) 58%,
    rgba(20, 94, 249, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 1rem;
    color: white;
    opacity: 0.8;
  }
`;

const StyledSearchField = styled(Card)`
  position: relative;

  form {
    display: flex;
    align-items: center;

    label {
      margin-right: 1rem;
    }

    input {
      padding: 0.2rem;
      font-size: 1rem;
    }
  }
  .error {
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    color: red;
    width: 100%;
    text-align: center;
  }
`;

const SearchPage = () => {
  const [{ locationSearch, error }, dispatch] = useWeatherState();
  const handleChange = (e) =>
    dispatch({
      type: "HANDLE_CHANGE",
      payload: { key: "locationSearch", value: e.target.value },
    });

  const onSearch = async (e) => {
    e.preventDefault();
    const data = await getWeather(locationSearch);
    if (data.error) {
      return dispatch({
        type: "ON_SEARCH_FAIL",
        payload: { error: data.error.message },
      });
    }
    dispatch({ type: "ON_SEARCH_SUCCESS", payload: data });
  };

  return (
    <StyledSearchPage>
      <h2>React Weather App</h2>
      <StyledSearchField>
        <form onSubmit={onSearch}>
          <label htmlFor="search">Enter your Zip Code</label>
          <input type="text" onChange={handleChange} value={locationSearch} />
        </form>
        {error && <div className="error">{error}</div>}
      </StyledSearchField>
    </StyledSearchPage>
  );
};

export default SearchPage;
