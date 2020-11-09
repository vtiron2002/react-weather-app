const GOOGLE_MAPS_API_KEY = "";
const WEATHER_API_KEY = "";

export const coordsToLocation = async ({ lat, long }) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAPS_API_KEY}`,
  );
  const data = await res.json();
  const { results } = data;

  return results[0].formatted_address
    .split(" ")
    .slice(1, results[0].formatted_address.length - 1)
    .join(" ");
};

export const getWeather = async (location) => {
  const endpoint = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=4`;
  const res = await fetch(endpoint);
  return await res.json();
};
