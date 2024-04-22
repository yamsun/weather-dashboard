import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SidePanel = ({weatherData: data}) => {
    console.log('weatherData in side', data);
    const [cityImage, setCityImage] = useState('https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1571679654681-ba01b9e1e117')
    const [weatherImg, setWeatherImg] = useState("")

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
        axios.get(`https://api.unsplash.com/search/photos?query=${weather}&client_id=j9aFe3aT-exks1nuSlwY1BmX9bRAQkKRR-_yQKayG-k&per_page=1`)
        .then((res)=> {
            console.log('weather img res', res)
            setWeatherImg(res?.data?.results?.[0]?.urls?.raw)
        })
        .catch((err)=> {
            console.log({err});
        })
    }

    useEffect(()=> {
        getCityImage(data?.name)
        getWeatherImage(data?.weather?.[0]?.description)
    }, [data])
  return (
    <div className='grid grid-cols-1 grid-rows-12 p-10 gap-4 h-full'>
        <div className=' row-span-1 flex justify-between items-center gap-2'>
            <div className='flex items-center gap-2 flex-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <div className='flex-1'>
                    <form>
                        <input placeholder='Search for places ...' className='w-full'/>
                    </form>
                </div>
            </div>
            <div className='bg-[#F6F6F8] text-black p-2 align-middle rounded-full'>
                <span className="material-symbols-outlined align-middle">
                    my_location
                </span>            
            </div>
            
        </div>

        <div className='row-span-4 flex justify-center items-center w-full h-60'>
            <img src={weatherImg} className="w-full h-full object-cover rounded-2xl"/>
            {/* <img height='200px' width='200px' src={`https://openweathermap.org/img/wn/10d@4x.png`} /> */}
        </div>
        <div className='row-span-3  flex flex-col justify-between gap-6'>
            <div className='flex'>
                <h1 className='text-8xl font-light'>{parseInt(data?.main?.temp)}</h1>
                <h1 className='text-6xl font-light'>°C</h1>
            </div>
            <div className='text-lg font-normal'>Monday, <span className='text-[#ADADAD]'>16:00</span></div>
            <hr/>
        </div>
        <div className='row-span-2  py-4 flex flex-col gap-6'>
            <div className='flex gap-2'>
            <span className="material-symbols-outlined">
                cloud
            </span>

            <div className='align-middle'>{data?.weather?.[0]?.description}</div>
            </div>
            <div className='flex gap-2 items-center'> 
                <span className="material-symbols-outlined">
                    water
                </span>
                <div className='align-middle'>Rain 30%</div>
            </div>
        </div>
        <div className='row-span-2 w-full h-28 relative' >
            <img src={cityImage} 
                className="w-full h-full object-cover rounded-2xl" alt={data?.name}
            />
            <div className="absolute inset-0 flex justify-center items-center text-white">
                <span className="text-xl font-medium">{data?.name}, {data?.sys?.country}</span>
            </div>
        </div>
    </div>
  )
}

export default SidePanel