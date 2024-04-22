import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SidePanel = ({weatherData: data, getWeatherByCity, cityName, setCityName, getMyLocation, isFarenheit, loading}) => {
    console.log('weatherData in side', data);
    const [cityImage, setCityImage] = useState('https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1571679654681-ba01b9e1e117')
    const [weatherImg, setWeatherImg] = useState("https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1571679654681-ba01b9e1e117")

    console.log({cityImage});

    const getCityImage = (cityName) => {
        axios.get(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=j9aFe3aT-exks1nuSlwY1BmX9bRAQkKRR-_yQKayG-k&per_page=1`)
        .then((res)=> {
            console.log('city img res', res)
            setCityImage(res?.data?.results?.[0]?.urls?.raw)
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

    const timestamp = data?.dt * 1000;
    const date = new Date(timestamp);
    const formattedDateTime = date.toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: 'numeric' });


  return (
    <div className='flex flex-col justify-around p-10 gap-4 h-full'>
        <div className='flex justify-between items-center gap-2'>
            <div className='flex items-center gap-2 flex-1'>
                <div className='flex-1 flex items-center rounded-xl px-2 hover:outline outline-gray-400 outline-2' 
                // style={{border:"2px solid lightgray"}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <form className='flex-1' onSubmit={(e)=> {
                        e.preventDefault()
                        const inputValue = e.target.querySelector('input').value; // Get the input value
                        getWeatherByCity(inputValue);
                        setCityName(inputValue)
                    }}>
                        <input type='search' placeholder='Search for places ...' className='w-full p-2 outline-none'/>
                    </form>
                </div>
            </div>
            <div className='bg-[#F6F6F8] text-black p-2 align-middle rounded-full cursor-pointer' onClick={getMyLocation}>
                <span className="material-symbols-outlined align-middle">
                    my_location
                </span>            
            </div>
            
        </div>

        <div className='flex justify-center items-center w-full min-h-40 h-[20vh] relative'>
            {loading?.city ? <ImageSkeleton /> : (
                <>
                    <img src={weatherImg} className="w-full h-full object-cover rounded-2xl" alt={data?.weather?.[0]?.description}/>
                    <div className='absolute bottom-2 flex flex-col items-center text-white'>
                        <div className='flex'>
                            <h1 className='text-8xl font-light'>{parseInt(data?.main?.temp)}</h1>
                            <h1 className='text-6xl font-light'>°{isFarenheit? "F" : "C"}</h1>
                        </div>
                        <div className='text-lg font-normal'>{formattedDateTime}</div>
                    </div>
                </>
            )}
        </div>
      
        <div className=' py-4 flex flex-col gap-6'>
            <div className='flex gap-2'>
            <span className="material-symbols-outlined">
                cloud
            </span>

            <div className='align-middle'>{data?.weather?.[0]?.description || "loading..."}</div>
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
        <div className='w-full h-[30vh] relative' >
            {
                loading?.city ? (
                    <ImageSkeleton />
                ) : (
                    <>
                        <img src={cityImage} 
                            className="w-full h-full object-cover rounded-2xl" alt={data?.name}
                            />
                        <div className="absolute inset-0 flex justify-center items-center text-white">
                            <span className="text-2xl font-medium p-2  hover:bg-gray-800 hover:bg-opacity-70 hover:text-white">{data?.name}, {data?.sys?.country}</span>
                        </div>
                    </>

                )
            }
        </div>
    </div>
  )
}

const ImageSkeleton = () => {
    return (
        <>
            <div class="h-full w-full rounded-2xl bg-gray-200 object-cover"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                <div class="h-10 w-2/3 rounded bg-gray-200"></div>
            </div>
        </>
    )
}

export default SidePanel