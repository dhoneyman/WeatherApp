let cityBtn = document.querySelector('#city-search');
let weatherP = document.querySelector('#weather-p');
let cityDisplay = document.querySelector('#city-name');
let tempDisplay = document.querySelector('#temp');
let windDisplay = document.querySelector('#wind');
let humidDisplay = document.querySelector('#humid');
let uviDisplay = document.querySelector('#uvi');


function fiveDay() {
    var searchedCity = document.querySelector('#searched-city').value;
    console.log(searchedCity);
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=b84e6d496a10f1cb5dfbeeca267b17d6`;

    fetch(requestUrl)
      .then(function (responce) {
          return responce.json();
      })
      .then(function (fiveDay) {
        console.log(fiveDay)

        cityDisplay.textContent = searchedCity;
        tempDisplay.textContent = fiveDay.list[0].main.temp;
        windDisplay.textContent = fiveDay.list[0].wind.speed + " MPH";
        humidDisplay.textContent = fiveDay.list[0].main.humidity;
        // uviDisplay.textContent = 
      })
}

cityBtn.addEventListener('click',fiveDay);