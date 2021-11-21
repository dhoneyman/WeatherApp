let cityBtn = document.querySelector('#city-search');
let weatherP = document.querySelector('#weather-p');
let cityDisplay = document.querySelector('#city-name');
let tempDisplay = document.querySelector('#temp');
let windDisplay = document.querySelector('#wind');
let humidDisplay = document.querySelector('#humid');
let uviDisplay = document.querySelector('#uvi');


function fiveDay() {
    var searchedCity = document.querySelector('#searched-city').value;
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=b84e6d496a10f1cb5dfbeeca267b17d6`;

    fetch(requestUrl)
      .then(function (responce) {
          return responce.json();
      })
      .then(function (fiveDay) {
        console.log(fiveDay)

        cityDisplay.textContent = fiveDay.city.name;
        tempDisplay.textContent = fiveDay.list[0].main.temp;
        windDisplay.textContent = fiveDay.list[0].wind.speed + " MPH";
        humidDisplay.textContent = fiveDay.list[0].main.humidity;
        // uviDisplay.textContent = 

        let lat = fiveDay.city.coord.lat;
        let lon = fiveDay.city.coord.lon;
        
        searchedCity = document.querySelector('#searched-city').value;
        var requestUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=6a86bc2b6b72e3f1aa5395dbb3a0c828
        `;
        
        fetch(requestUrl2)
        .then(function (responce) {
            return responce.json();
        })
        .then(function (dataset2) {
            console.log(dataset2)
            
            // changing date
            $('.five-card .card-title').each(function(){
                let dayNumber = $(this).attr('data-number');
                let dataDate = dataset2.daily[dayNumber].dt;
                // $('.card-title').text() = dataset2.daily[dayNumber].dt;
                // $('.temp').text() = dataset2.daily[dayNumber].temp.day;
                // $('.wind').text() = dataset2.daily[dayNumber].wind_speed;
                // $('.humid').text() = dataset2.daily[dayNumber].humidity;
                // $('.card-title').text() = 'test'
                console.log(dataDate);

                console.log(dateConverter(dataDate));
            })
            
        
    })
    })
    }

    function dateConverter(dt){
        let date = new Date(dt*1000);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    function 


cityBtn.addEventListener('click',fiveDay);