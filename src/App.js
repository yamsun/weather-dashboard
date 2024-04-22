import { useEffect, useState } from 'react';
import './App.css';
import Main from './components/Main';
import SidePanel from './components/SidePanel';
import './index.css';
import axios from 'axios';


function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [weatherForecastData, setWeatherForecastData] = useState(null);

  const getWeatherByCity = (cityName) => {
    console.log({ cityName });
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: cityName,
          appid: "d98411a21a90bab401b28d9346819bba",
          units: "metric",
        },
      })
      .then((res) => {
        console.log("Weather by city", res.data);
        setWeatherData(res?.data);
      })
      .catch((err) => {
        console.log("Weather by city error", err);
        setWeatherData(null);
      });
  };

  const getWeatherByCoordinates = (coords) => {
    console.log({ coords });
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: coords?.latitude,
          lon: coords?.longitude,
          appid: "d98411a21a90bab401b28d9346819bba",
          units: "metric",
        },
      })
      .then((res) => {
        console.log("Weather by Coordinates", res.data);
        setWeatherData(res?.data);
      })
      .catch((err) => {
        console.log("Weather by Coordinates error", err);
        setWeatherData(null);
      });
  };

  const getWeatherDataOneCall = () => {
    axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=25.6&lon=85.1167&exclude=minutely,hourly,alerts&appid=10dc4a9025b811536cde5459c533e738&units=metric')
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
          // setMyLatitute(position.coords.latitude);
          // setMyLongitute(position.coords.longitude);
          getWeatherByCoordinates(position.coords);
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  };

  useEffect(()=> {
    getWeatherDataOneCall('kolkata')
    getWeatherByCity('kolkata')
  }, [])

  console.log({weatherData});

  return (
    <div className="p-10 px-40 w-screen min-h-screen   bg-[#D6D7DA]">
      <div className="grid grid-cols-5 grid-rows-5 gap-0 h-full">
          <div className="col-span-2 row-span-5 bg-white rounded-l-3xl">
            <SidePanel weatherData={weatherData}/>
          </div>
          <div className="col-span-3 row-span-5 col-start-3 bg-[#F6F6F8] rounded-r-3xl">
            <Main weatherData={weatherData} weekData={weatherForecastData?.daily}/>
          </div>
      </div>
    </div>
  );
}

export default App;
