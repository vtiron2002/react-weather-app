const GOOGLE_MAPS_API_KEY = "AIzaSyBFwVDYRJhyVzX8t6c77H5I9AJfD_zJ11c";
const WEATHER_API_KEY = "8748d1179aa448af867220816200811";

export const coordsToLocation = async ({ lat, long }) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAPS_API_KEY}`,
  );
  const data = await res.json();
  const { results } = data;
  const [{ formatted_address }] = results;
  return formatted_address;
};

export const getWeather = async (zipCode) => {
  const endpoint = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${zipCode}&days=3`;
  const res = await fetch(endpoint);
  return await res.json();
};
