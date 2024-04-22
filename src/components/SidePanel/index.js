import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SidePanel = ({weatherData: data, getWeatherByCity, cityName, setCityName, getMyLocation, isFarenheit}) => {
    console.log('weatherData in side', data);
    const [cityImage, setCityImage] = useState('https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1571679654681-ba01b9e1e117')
    const [weatherImg, setWeatherImg] = useState("")

    console.log({cityImage});

    const getCityImage = (cityName) => {
        axios.get(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=j9aFe3aT-exks1nuSlwY1BmX9bRAQkKRR-_yQKayG-k&per_page=1`)
        .then((res)=> {
            console.log('city img res', res)
            setCityImage(res?.data?.results?.[0]?.urls?.small)
        })
        .catch((err)=> {
            console.log({err});
        })
    }

    const getWeatherImage = (weather) => {
        axios.get(`https://api.unsplash.com/search/photos?query=${weather}&client_id=j9aFe3aT-exks1nuSlwY1BmX9bRAQkKRR-_yQKayG-k&per_page=1&color=black`)
        .then((res)=> {
            console.log('weather img res', res)
            setWeatherImg(res?.data?.results?.[0]?.urls?.small)
        })
        .catch((err)=> {
            console.log({err});
        })
    }


    useEffect(()=> {
        getCityImage(cityName)
        getWeatherImage(data?.weather?.[0]?.description)
    }, [data, cityName])
  return (
    <div className='flex flex-col justify-around p-10 gap-4 h-full'>
        <div className='flex justify-between items-center gap-2'>
            <div className='flex items-center gap-2 flex-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <div className='flex-1'>
                    <form onSubmit={(e)=> {
                        e.preventDefault()
                        const inputValue = e.target.querySelector('input').value; // Get the input value
                        getWeatherByCity(inputValue);
                        setCityName(inputValue)
                    }}>
                        <input type='text' onSubmit={(e)=> {
                            e.stopPropagation()
                            getWeatherByCity(e.target.value)
                            console.log('form data', e)
                    }} placeholder='Search for places ...' className='w-full p-2'/>
                    </form>
                </div>
            </div>
            <div className='bg-[#F6F6F8] text-black p-2 align-middle rounded-full cursor-pointer' onClick={getMyLocation}>
                <span className="material-symbols-outlined align-middle">
                    my_location
                </span>            
            </div>
            
        </div>

        <div className='flex justify-center items-center w-full h-40 relative'>
            <img src={weatherImg} className="w-full h-full object-cover rounded-2xl"/>
            {/* <img height='200px' width='200px' src={`https://openweathermap.org/img/wn/10d@4x.png`} /> */}
            <div className='absolute bottom-2 flex flex-col items-center text-white'>
                <div className='flex'>
                    <h1 className='text-8xl font-light'>{parseInt(data?.main?.temp)}</h1>
                    <h1 className='text-6xl font-light'>°{isFarenheit? "F" : "C"}</h1>
                </div>
                <div className='text-lg font-normal'>Monday, <span >16:00</span></div>
            </div>
        </div>
      
        <div className=' py-4 flex flex-col gap-6'>
            <div className='flex gap-2'>
            <span className="material-symbols-outlined">
                cloud
            </span>

            <div className='align-middle'>{data?.weather?.[0]?.description}</div>
            </div>
            <div className='flex gap-2 items-center'> 
                <span className="material-symbols-outlined">
                <span class="material-symbols-outlined">
                    thermometer
                </span>
                </span>
                <div className='align-middle'>Feels like <b> {data?.main?.feels_like}°{isFarenheit? "F" : "C"} </b></div>
            </div>
        </div>
        <div className='w-full h-40 relative' >
            <img src={cityImage} 
                className="w-full h-full object-cover rounded-2xl" alt={data?.name}
            />
            <div className="absolute inset-0 flex justify-center items-center text-white">
                <span className="text-2xl font-medium">{data?.name}, {data?.sys?.country}</span>
            </div>
        </div>
    </div>
  )
}

export default SidePanel