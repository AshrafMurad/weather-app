import { cloneElement, useEffect, useState } from "react";
import Search_bar from "../assets/search_bar.png";
import clearMorning from '../assets/01d.png'
import cloudyMorning from '../assets/02d.png'
import cloudy from '../assets/03d.png'
import rainyMorning from '../assets/09d.png'
import thunderMorning from '../assets/11d.png'
import snow from '../assets/13d.png'
import mist from '../assets/50d.png'
import clearNight from '../assets/01n.png'
import cloudyNight from '../assets/02n.png'
import rainyNight from '../assets/10n.png'
import thunderNight from '../assets/11n.png'

import Wind_speed from '../assets/wind_speed.png'
import Humidity from '../assets/humidity.png'



const WetherApp = () => {
  const [background, setBackground] = useState();
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState()
  const [temp, setTemp] =useState()
  const [windSpeed, setWindSpeed] = useState()
  const [humidity, setHumidity] = useState()
  const [weather, setWeather] = useState();
  const [error, setError] = useState()
  const [buttonClick, setButtonClick] = useState()
  const [weatherIcon, setWeatherIcon] = useState(
    
  )

  const Api = {
    BASE_URL : 'https://api.openweathermap.org/data/2.5/',
    API_KEY  : '339e77c9261ca835eaedd9f73e30d586'
  }

  useEffect (() =>{
    const fetchWeather = async () =>{
      setLoading(true)
      try{
        let response = await fetch(`${Api.BASE_URL}weather?q=${query}&units=metric&APPID=${Api.API_KEY}`)
        const weather = await response.json()
        setWeather(weather)
        setCity(weather.name)
        setTemp(Math.round(weather.main.temp))
        
        setWindSpeed(weather.wind.speed)
        setHumidity(weather.main.humidity)
        console.log(weather)
   
        if(weather.weather.icon === '01d'){
          setWeatherIcon(cloudyMorning)
        }
        else if(weather.weather.icon === '02d'){
          setWeatherIcon(cloudyMorning)
        }
        else if(weather.weather.icon === '03d' || '04d' || '03n' || '04n'){
          setWeatherIcon(cloudy)
        }
        else if(weather.weather.icon === '09d' || '10d'){
          setWeatherIcon(rainyMorning)
        }
        else if(weather.weather.icon === '13d' || '13n'){
          setWeatherIcon(snow)
        }
        else if(weather.weather.icon === '50d' || '50n'){
          setWeatherIcon(mist)
        }
        else if(weather.weather.icon === '01n'){
          setWeatherIcon(clearNight)
        }
        else if(weather.weather.icon === '02n'){
          setWeatherIcon(cloudyNight)
        }
        else if(weather.weather.icon === '09n' || '10n'){
          setWeatherIcon(rainyNight)
        }
        else if(weather.weather.icon === '11n'){
          setWeatherIcon(thunderNight)
        }
        else{
          setWeatherIcon('')
        }

  
      }
      catch(err){
        setError(err)
      } 
      finally{
      setLoading(false)
    }  
    
    }
    setButtonClick(()=> fetchWeather)
    
  },[query])




 

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={
          temp > 20
            ? "bg-hot_weather  rounded-md flex flex-col items-center w-[430px] h-[732px] "
            : "bg-cold-weather rounded-md flex flex-col items-center w-[430px] h-[732px]"
        }
      >
        <div className="flex">
          <input
            type="text "
            className="w-72 h-10 mt-4 opacity-75 rounded-md text-black p-4 outline-none"
            placeholder="Search for a city..."
            onChange={(e)=> setQuery(e.target.value)}
            value={query}
          />
          <button  className="bg-white opacity-100 w-10  h-10 rounded-r-xl m-4 flex justify-center items-center cursor-pointer -ml-4 z-10 "
            onClick={buttonClick}
            >
            <img src={Search_bar} alt="" className="w-8 h-8" />
          </button>
        </div>
        <div className=" flex flex-col items-center justify-center  bg-slateBlack w-44 rounded-xl h-36 text-white mt-6">
            <h1 className=" font-bold text-3xl ">{city}</h1>
            <h1 className="font-bold text-3xl mt-2">{temp}° C</h1>
        </div>

        <div className=" flex justify-center  bg-slateBlack w-44 rounded-xl h-36 mt-6">
            <img src={weatherIcon} alt="" className="w-40 h-36" />
        </div>

        <div className=" flex justify-around items-center  bg-slateBlack w-[380px] rounded-xl h-36 text-white mt-24">
            <div className="flex justify-around">
              <img src={Wind_speed} alt="wind_speed" />
              <div className="ml-2">
                <h1 className="font-bold text-xl">Wind Speed</h1>
                <h1 className="font-bold text-xl">{windSpeed} KM / H</h1>
              </div>
            </div>
            <div className="flex justify-around">
              <img src={Humidity} alt="humidity" />
              <div className="ml-2">
                <h1 className="font-bold text-xl">Humidity</h1>
                <h1 className="font-bold text-xl">{humidity} %</h1>
              </div>
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default WetherApp;
