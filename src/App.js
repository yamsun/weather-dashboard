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
  const [isToday, setIsToday ] = useState(false);
  const [uviData, setUviData] = useState("");
  const [airData, setAirData] = useState("");

  const [loading, setLoading] = useState({
    city: false,
    forecast: false,
    uvi: false,
    aqi: false,
  })

  const getWeatherByCity = (cityName) => {
    setLoading(p => ({ ...p, city: true }))
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: cityName,
          // appid: "d98411a21a90bab401b28d9346819bba",
          appid: "ac04facc0292386d4ce278841518c209",
          units: isFarenheit ? "imperial" : "metric",
        },
      })
      .then((res) => {
        console.log("Weather by city", res.data);
        setWeatherData(res?.data);
        getWeatherDataOneCall(res?.data?.coord?.lat, res?.data?.coord?.lon)
        getUVIdata(res?.data?.coord?.lat, res?.data?.coord?.lon)
        getAirdata(res?.data?.coord?.lat, res?.data?.coord?.lon)
      })
      .catch((err) => {
        console.log("Weather by city error", err);
        // setWeatherData(null);
        alert(err?.response?.data?.message)
      })
      .finally(() => {
        setLoading(p => ({ ...p, city: false }))
      })
  };

  const getWeatherByCoordinates = (lat, lon) => {
    setLoading(p => ({ ...p, city: true }))
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: lat,
          lon: lon,
          appid: "ac04facc0292386d4ce278841518c209",
          // appid: "d98411a21a90bab401b28d9346819bba",
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
      })
      .finally(()=> {
        setLoading(p => ({ ...p, city: false }))
      })
  };

  const getWeatherDataOneCall = (lat, lon) => {
    setLoading(p => ({ ...p, forecast: true }))
    let params = {
      appid: "ac04facc0292386d4ce278841518c209",
      units: isFarenheit ? "imperial" : "metric",
      lat : lat,
      lon : lon,
      cnt: 7
    }
    axios.get('https://api.openweathermap.org/data/2.5/forecast', {params})
    .then(res => {
      // setWeatherData(res?.data?.current)
      setWeatherForecastData(res?.data)
    })
    .catch(err => {
      console.log({err})
    })
    .finally(()=> {
      setLoading(p => ({ ...p, forecast: false }))
    })
  }

  const getUVIdata = (lat, lon) => {
    setLoading(p => ({ ...p, uvi: true }))
    let params = {
      appid: "ac04facc0292386d4ce278841518c209",
      units: isFarenheit ? "imperial" : "metric",
      lat : lat,
      lon : lon,
      cnt:7
    }
    axios.get('https://api.openweathermap.org/data/2.5/uvi', {params})
    .then(res => {
      // setWeatherData(res?.data?.current)
      setUviData(res?.data?.value)
    })
    .catch(err => {
      console.log({err})
    })
    .finally(()=> {
      setLoading(p => ({ ...p, uvi: false }))
    })
  }

  // air_pollution

  const getAirdata = (lat, lon) => {
    setLoading(p => ({ ...p, aqi: true }))
    let params = {
      appid: "ac04facc0292386d4ce278841518c209",
      // units: isFarenheit ? "imperial" : "metric",
      lat : lat,
      lon : lon,
    }
    axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {params})
    .then(res => {
      // setWeatherData(res?.data?.current)
      setAirData(res?.data?.list?.[0]?.main?.aqi)
    })
    .catch(err => {
      console.log({err})
    })
    .finally(()=> {
      setLoading(p => ({ ...p, aqi: false }))
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
          getWeatherDataOneCall(position.coords?.latitude, position.coords?.longitude);
          getUVIdata(position.coords?.latitude, position.coords?.longitude)
          getAirdata(position.coords?.latitude, position.coords?.longitude)
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
    <div className="w-screen h-screen   bg-[#D6D7DA]">
      <div className="grid grid-cols-5 grid-rows-5 gap-0 h-full">
          <div className="col-span-2 row-span-5 bg-white ">
            <SidePanel weatherData={weatherData} getWeatherByCity={getWeatherByCity} cityName={cityName} setCityName={setCityName} getMyLocation={getMyLocation} isFarenheit={isFarenheit} loading={loading}/>
          </div>
          <div className="col-span-3 row-span-5 col-start-3 bg-[#F6F6F8] ">
            <Main weatherData={weatherData} weekData={weatherForecastData?.list} hourlyData={weatherForecastData?.list} setIsFarenheit={setIsFarenheit} isFarenheit={isFarenheit} isToday={isToday} setIsToday={setIsToday} uviData={uviData} airData={airData} loading={loading}/>
          </div>
      </div>
      <div id="desktop-view-message" class="lg:hidden fixed bottom-0 right-0 bg-gray-900 text-white p-4">
          This website is optimized for desktop viewing. Mobile responsiveness is under development.
      </div>
    </div>
  );
}

export default App;
