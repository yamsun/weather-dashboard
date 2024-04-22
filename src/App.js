import { useEffect, useState } from 'react';
import './App.css';
import Main from './components/Main';
import SidePanel from './components/SidePanel';
import './index.css';
import axios from 'axios';


function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [weatherForecastData, setWeatherForecastData] = useState(null);
  const [cityName, setCityName] = useState('Kolkata');
  const [isFarenheit, setIsFarenheit] = useState(false);
  const [myLongitute, setMyLongitute] = useState("");
  const [myLatitute, setMyLatitute] = useState("");
  const [isToday, setIsToday ] = useState(false)

  const getWeatherByCity = (cityName) => {
    console.log({ cityName });
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: cityName,
          appid: "d98411a21a90bab401b28d9346819bba",
          units: isFarenheit ? "imperial" : "metric",
        },
      })
      .then((res) => {
        console.log("Weather by city", res.data);
        setWeatherData(res?.data);
        getWeatherDataOneCall(res?.data?.coord?.lat, res?.data?.coord?.lon)
      })
      .catch((err) => {
        console.log("Weather by city error", err);
        // setWeatherData(null);
        alert(err?.response?.data?.message)
      });
  };

  const getWeatherByCoordinates = (lat, lon) => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: lat,
          lon: lon,
          appid: "d98411a21a90bab401b28d9346819bba",
          units: isFarenheit ? "imperial" : "metric",
        },
      })
      .then((res) => {
        console.log("Weather by Coordinates", res.data);
        setWeatherData(res?.data);
        setCityName(res?.data?.name)
      })
      .catch((err) => {
        console.log("Weather by Coordinates error", err);
        setWeatherData(null);
      });
  };

  const getWeatherDataOneCall = (lat, lon) => {
    let params = {
      exclude: "minutely,alerts",
      appid: "10dc4a9025b811536cde5459c533e738",
      units: isFarenheit ? "imperial" : "metric",
      lat : lat,
      lon : lon
    }
    axios.get('https://api.openweathermap.org/data/2.5/onecall', {params})
    .then(res => {
      // setWeatherData(res?.data?.current)
      setWeatherForecastData(res?.data)
    })
    .catch(err => {
      console.log({err})
    })
  }

  const getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          setMyLatitute(position.coords.latitude);
          setMyLongitute(position.coords.longitude);
          getWeatherByCoordinates(position.coords?.latitude, position.coords?.longitude);
          getWeatherDataOneCall(position.coords?.latitude, position.coords?.longitude)
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  };

  useEffect(()=> {
    getWeatherByCity(cityName)
    // document.body.style.zoom = "80%"
  }, [cityName, isFarenheit])

  useEffect(()=> {
    if(!myLatitute || !myLongitute) return;
    getWeatherByCoordinates()
  }, [isFarenheit])

  console.log({weatherData});

  return (
    <div className="p-10 px-20 w-screen h-screen   bg-[#D6D7DA]">
      <div className="grid grid-cols-5 grid-rows-5 gap-0 h-full">
          <div className="col-span-2 row-span-5 bg-white rounded-l-3xl">
            <SidePanel weatherData={weatherData} getWeatherByCity={getWeatherByCity} cityName={cityName} setCityName={setCityName} getMyLocation={getMyLocation} isFarenheit={isFarenheit}/>
          </div>
          <div className="col-span-3 row-span-5 col-start-3 bg-[#F6F6F8] rounded-r-3xl">
            <Main weatherData={weatherData} weekData={weatherForecastData?.daily} hourlyData={weatherForecastData?.hourly} setIsFarenheit={setIsFarenheit} isFarenheit={isFarenheit} isToday={isToday} setIsToday={setIsToday} />
          </div>
      </div>
    </div>
  );
}

export default App;
