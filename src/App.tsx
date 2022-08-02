import React, {useState} from 'react';
import Search from './components/Search/Search'
import './App.css';
import CurrentWeather from "./components/current-weather/Current-weather";
import {WEATHER_API_KEY, WEATHER_API_URL} from "./api";
import Forecast from "./components/forecast/forecast";

function App() {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecast, setForecast] = useState(null)

    const handleOnSearchChange = (searchData:{value:string, label:string}) =>{
        const [latitude, longitude] = searchData.value.split(" ");

        const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`)
        const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`)


        Promise.all([currentWeatherFetch, forecastWeatherFetch])
            .then(async (response:any)=>{
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                setCurrentWeather({city: searchData.label,...weatherResponse});
                setForecast({city: searchData.label,...forecastResponse})
            })
            .catch((err)=>console.log(err))
    }

    console.log(currentWeather)
    console.log(forecast)
    console.log(forecast && (forecast as any).list.length)
    console.log(forecast && (forecast as any).list[0].dt_txt)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}></Search>
        {currentWeather && <CurrentWeather data={currentWeather}></CurrentWeather>}
        {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
