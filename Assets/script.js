let cityBtn = document.querySelector('#city-search');
let weatherP = document.querySelector('#weather-p');
let cityDisplay = document.querySelector('#city-name');
let tempDisplay = document.querySelector('#temp');
let windDisplay = document.querySelector('#wind');
let humidDisplay = document.querySelector('#humid');
let uviDisplay = document.querySelector('#uvi');
let weatherIcon = document.querySelector('.weather-icon');
let citySearchList = document.querySelector('#city-search-list');
let forcast = document.querySelector('#forcast');
let uvi = document.querySelector('#uvi');
let searchedCity;
let iconNumber;
let storageArray = [];

retrieveSrchBtn();

function fiveDay() {
    searchedCity = document.querySelector('#searched-city').value;
    searchBtnCreater();
    searchWeather(searchedCity);
    

    }
function searchWeather(searchedCity){ 
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=b84e6d496a10f1cb5dfbeeca267b17d6`;
    
    fetch(requestUrl)
      .then(function (responce) {
          return responce.json();
      })
      .then(function (fiveDay) {
        console.log(fiveDay)
        cityDisplay.textContent = fiveDay.city.name;

        let lat = fiveDay.city.coord.lat;
        let lon = fiveDay.city.coord.lon;
        
        searchedCity = document.querySelector('#searched-city').value;
        var requestUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=6a86bc2b6b72e3f1aa5395dbb3a0c828`;
        
        fetch(requestUrl2)
        .then(function (responce) {
            return responce.json();
        })
        .then(function (currenSet) {
            console.log(currenSet)
            
            forcast.textContent = currenSet.current.weather[0].main;
            tempDisplay.textContent = tempConverter(currenSet.current.temp)+ '°F';
            windDisplay.textContent = currenSet.current.wind_speed + " MPH";
            humidDisplay.textContent = currenSet.current.humidity;
            uviDisplay.textContent = currenSet.current.uviDisplay;
            iconNumber = currenSet.current.weather[0].icon;
            uvi.textContent = currenSet.current.uvi;
            weatherIcon.innerHTML = `<img src='/Assets/images/${iconNumber}.png'/>`;
            // changing date
            $('.five-card .card').each(function(){
                let dayNumber = parseInt($(this).find('.card-title').attr('data-number'));
                let selectedDate = currenSet.daily[dayNumber];
                iconNumber = currenSet.daily[dayNumber].weather[0].icon;
            
                $(this).find('.card-title').text(dateConverter(selectedDate.dt));
                $(this).find('.card-subtitle').text(selectedDate.weather[0].main);
                $(this).find('.temp').text(tempConverter(selectedDate.temp.day) + '°F');
                $(this).find('.wind').text(selectedDate.wind_speed + " MPH");
                $(this).find('.humid').text(selectedDate.humidity);
                $(this).find('.weather-icon').html(`<img src='/Assets/images/${iconNumber}.png'/>`);
                $(this).find('#uvi').text(selectedDate.uvi);

                // console.log(selectedDate);

                // console.log(dateConverter(selectedDate));
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

    function tempConverter(kelvin) {
        let fahrenheit = Math.floor((kelvin - 273.15)*(9/5)+(32));
        return fahrenheit;
    }

    function searchBtnCreater() {
        for (let i=0; i < storageArray.length; i++){
            if (storageArray[i] === searchedCity){
            }
        }
        let btnLi = document.createElement('li');
        let oldSearchBtn = document.createElement('button');
        oldSearchBtn.textContent = searchedCity;
        btnLi.append(oldSearchBtn);
        citySearchList.append(btnLi);
        storageArray.push(searchedCity);
        localStorage.setItem('storageArray', JSON.stringify(storageArray));
        
        
        
    }
    
    function retrieveSrchBtn (){
        storageArray = JSON.parse(localStorage.getItem('storageArray')) || [];
        // citySearchList.innerHTML = '';
        for(let i=0; i < storageArray.length; i++){
            let btnLi = document.createElement('li');
            let oldSearchBtn = document.createElement('button');
            oldSearchBtn.textContent = storageArray[i];
            btnLi.append(oldSearchBtn);
            citySearchList.append(btnLi);
        }
        
    }

    $('#city-search-list').on('click',function(event) {
      searchWeather(event.target.textContent)
    })

cityBtn.addEventListener('click',fiveDay);

