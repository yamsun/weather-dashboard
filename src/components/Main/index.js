import React, { useState } from 'react'



const Main = ({weekData, weatherData, isFarenheit, setIsFarenheit, isToday, setIsToday, hourlyData, uviData, airData }) => {
    let todayData = weatherData
    const sunriseTime = new Date(todayData?.sys?.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const sunsetTime = new Date(todayData?.sys?.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    const selectedStyle = {background: "black", color:"white"}
    const unSelectedStyle = {background: "white", color:"black"}

    const isUnderLine = {textDecoration: "underline", textUnderlineOffset: '8px', color:"black"}

  return (
    <div className='grid grid-cols-1 grid-rows-10 p-10 gap-8 h-full'>
        <div className="row-span-1 flex justify-between">
            <div className='flex items-center gap-4 cursor-pointer'>
                <div className='text-xl text-[#afafaf]' style={ isToday? isUnderLine : null} onClick={()=> {
                    setIsToday(true)
                }}>Today</div>
                <div className='text-xl text-[#afafaf]' onClick={()=> {
                    setIsToday(false)
                }} style={ !isToday? isUnderLine : null}>Week</div>
            </div>
            <div className='flex items-center gap-8'>
                <div className='flex items-center gap-4'>
                    <div className='flex justify-center items-center w-8 h-8  rounded-full  p-4 cursor-pointer' style={ isFarenheit ? unSelectedStyle : selectedStyle} onClick={()=> {
                        setIsFarenheit(false);
                    }}>°C</div>
                    <div className='flex justify-center items-center w-8 h-8  rounded-full  p-4 cursor-pointer' onClick={()=> {
                        setIsFarenheit(true);
                    }} style={ !isFarenheit ? unSelectedStyle : selectedStyle}>°F</div>
                </div>
                <div className='flex justify-center items-center '>
                    <img width='50px' height='50px' className='rounded-xl' src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"  />
                </div> 
            </div>
        </div>
        {isToday? 
        <div className="row-span-3 flex gap-4 px-1 justify-start w-full ">
            {weekData?.map((item, index)=> {
                const hour = new Date(item?.dt * 1000).toLocaleTimeString([], {hour: '2-digit', hour12: true});
                // const date = new Date(item?.dt * 1000);
                const temp = parseInt(item?.main?.temp);
                const feelsLike = parseInt(item?.main?.feels_like)
                const weatherIconCode = item?.weather?.[0]?.icon;
                return (
                    <div key={item?.dt} className='flex-1 min-w-10 max-w-30 bg-white flex flex-col justify-between items-center p-4 rounded-xl bg-gradient-to-b from-white via-slate-200 to-white'>
                        <div className='text-sm font-medium'>{hour}</div>
                        <div>
                            <img src={`https://openweathermap.org/img/wn/${weatherIconCode}@4x.png`}/>
                        </div>
                        <div className='text-xs'>
                            <span className='text-xs'>{temp}°</span>{" "}
                            <span className='text-gray-500 text-xs'>{feelsLike}°</span>
                        </div>
                    </div>
                )
            })}
        </div>

        : <div className="row-span-3  flex  gap-4 px-1 justify-start w-full ">
            {weekData?.map((item, index)=> {
                const date = new Date(item?.dt * 1000);
                const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
                const maxTemp = parseInt(item.main.temp_max);
                const minTemp = parseInt(item.main.temp_min);
                // const weatherDescription = item.weather?.[0].description;
                const weatherIconCode = item.weather?.[0].icon;
                return (
                    <div key={item?.dt} className='flex-1 min-w-10 max-w-30 bg-white flex flex-col justify-between items-center p-4 rounded-xl bg-gradient-to-b from-white via-slate-200 to-white'>
                        <div className='text-sm font-medium'>{day.slice(0,3)}</div>
                        <div>
                            <img src={`https://openweathermap.org/img/wn/${weatherIconCode}@4x.png`}/>
                        </div>
                        <div className='text-xs'>
                            <span  className='text-xs'>{maxTemp}°</span>{" "}
                            <span className='text-gray-500 text-xs'>{minTemp}°</span>
                        </div>
                    </div>
                )
            })}
        </div>
        }
        <div className="row-span-7  flex flex-col  h-full pt-4 mt-6 gap-4" >
            <div className='text-xl font-medium'>Today's Highlights</div>
            
            <div className="grid grid-cols-3 grid-rows-2 gap-4 p-1 ">
    
                    <div className='flex-1 min-w-20 max-w-30 bg-white h-32 flex flex-col justify-between  py-2 px-4 rounded-3xl'>
                        <div className='text-[#979797] text-left'>UV Index</div>
                        <div className='flex flex-col justify-between h-full w-full p-2 items-center'>
                            <span className="material-symbols-outlined" style={{fontSize:"2em"}}>
                                flare
                            </span>
                            <div className='text-2xl'>{uviData}</div>
                            {/* <div><progress max="11" value="10" style={{width:"100px", color:"red"}}></progress></div> */}
                        </div>
                    </div>

                    <div className='flex-1 min-w-20 max-w-30 bg-white h-32 flex flex-col justify-between  py-2 px-4 rounded-3xl'>
                        <div className='text-[#979797]'>Wind Status</div>
                        <div className='flex flex-col justify-between h-full w-full p-2 items-center'>
                            <span className="material-symbols-outlined" style={{fontSize:"2em"}}>
                                air
                            </span>
                            <div className='text-2xl'>{parseInt(todayData?.wind?.speed)} {isFarenheit? "Miles/hr" : "Km/h"}</div>
                        </div>
                    </div>

                    <div className='flex-1 min-w-20 max-w-30 bg-white h-32 flex flex-col justify-between  py-2 px-4 rounded-3xl'>
                        <div className='text-[#979797]'>Sunrise & Sunset</div>
                        {/* <div>img</div> */}
                        <div className='flex  justify-between h-full w-full p-2 items-center'>
                            <span className="material-symbols-outlined"style={{fontSize:"2em"}} >
                                water_lux
                            </span>
                            <div className='font-medium'>{sunriseTime}</div>
                        </div>
                        <div className='flex  justify-between h-full w-full p-2 items-center'>
                            <span class="material-symbols-outlined" style={{fontSize:"2em"}}>
                                wb_twilight
                            </span>
                            <div className='font-medium'>{sunsetTime}</div>
                        </div>
                    </div>

                    <div className='flex-1 min-w-20 max-w-30 bg-white h-32 flex flex-col justify-between  py-2 px-4 rounded-3xl'>
                        <div className='text-[#979797]'>Humidity</div>

                        <div className='flex flex-col justify-between h-full w-full p-2 items-center'>
                            <span class="material-symbols-outlined" style={{fontSize:"2em"}}>
                                humidity_percentage
                            </span>
                            <div className='text-2xl'>{todayData?.main?.humidity}%</div>
                        </div>
                       
                    </div>

                    <div className='flex-1 min-w-20 max-w-30 bg-white h-32 flex flex-col justify-between  py-2 px-4 rounded-3xl'>
                        <div className='text-[#979797]'>Visibility</div>
                            <div className='flex flex-col justify-between h-full w-full p-2 items-center'>
                                <span class="material-symbols-outlined" style={{fontSize:"2em"}}>
                                    visibility
                                </span>
                                <div className='text-2xl'>{weatherData?.visibility / 1000} Km</div>
                            </div>
                    </div>

                    <div className='flex-1 min-w-20 max-w-30 bg-white h-32 flex flex-col justify-between  py-2 px-4 rounded-3xl'>
                        <div className='text-[#979797]'>Air Quality</div>
                        {/* <div>img</div> */}
                        <div className='flex flex-col justify-between h-full w-full p-2 items-center'>
                                <span class="material-symbols-outlined" style={{fontSize:"2em"}}>
                                    airwave
                                </span>
                                <div className='text-xl'>{getAQIMessage(airData)}</div>
                            {/* <div className='text-gray text-sm'>Unhealthy</div>  */}
                         </div>
                        
                    </div>
            
            </div>
    
        </div>
    </div>
)
}

function getAQIMessage(index) {
    switch (index) {
        case 1:
            return "Good";
        case 2:
            return "Fair";
        case 3:
            return "Moderate";
        case 4:
            return "Poor";
        case 5:
            return "Very Poor";
        default:
            return "Invalid index";
    }
}

const ForeCastCardSkeleton = () => {
    return (
        <div class="flex-1 min-w-10 max-w-30 bg-gray-200 animate-pulse flex flex-col justify-between items-center p-4 rounded-xl">
            <div class="h-4 bg-gray-400 rounded w-1/2"></div>
            <div class="h-16 w-16 bg-gray-400 rounded-full mt-2"></div>
            <div class="h-4 bg-gray-400 rounded w-2/3 mt-2"></div>
        </div>
    )
}

export default Main