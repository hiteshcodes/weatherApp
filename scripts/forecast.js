// const key = "yBqUWpAE8VxKW5GQMGG5VGV89SKVr114";
const key = "BFLSTGVDdT3BeANUm7JyDH5pFqIWu9Ih";
// get city information
const getCity = async (city) => {
  const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`;

  const response = await fetch(url);
  const data = await response.json();
  return data[0];
};

//get weather from city code
const getWeather = async (cityCode) => {
  const url = `http://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=${key}`;

  const response = await fetch(url);
  const data = await response.json();
  return data[0];
};
