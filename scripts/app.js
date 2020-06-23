const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  const { cityDets, weather } = data;
  //update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;</span>
    </div>
    `;

  // update night and day images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  // let timeSrc = null;
  // if (weather.IsDayTime) {
  //   // timeSrc = "./img/day.svg";
  //   timeSrc = "./img/day.gif";
  // } else {
  //   // timeSrc = "./img/night.svg";
  //   timeSrc = "./img/night.gif";
  // }
  let timeSrc;
  timeSrc = weather.IsDayTime
    ? (timeSrc = "./img/day.gif")
    : (timeSrc = "./img/night.gif");
  time.setAttribute("src", timeSrc);
  // remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err.message));

  // Set localStorage
  localStorage.setItem("location", city);
});

if (localStorage.getItem("location")) {
  updateCity(localStorage.getItem("location"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err.message));
}
