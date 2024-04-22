import React from 'react'

const Main = ({weekData, weatherData}) => {
    let isFarenheit = false
    let todayData = weekData?.[0]
    const sunriseTime = new Date(todayData?.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const sunsetTime = new Date(todayData?.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  return (
    <div className='grid grid-cols-1 grid-rows-10 p-10 gap-4 h-full'>
        <div className="row-span-1 flex justify-between">
            <div className='flex items-center gap-4 cursor-pointer'>
                <div className='text-xl text-[#afafaf]'>Today</div>
                <div className='text-xl underline underline-offset-8'>Week</div>
            </div>
            <div className='flex items-center gap-8'>
                <div className='flex items-center gap-4'>
                    <div className='flex justify-center items-center w-8 h-8 bg-black rounded-full text-white p-4'>°C</div>
                    <div className='flex justify-center items-center w-8 h-8 bg-white rounded-full text-black p-4'>°F</div>
                </div>
                <div className='flex justify-center items-center '>
                    <img width='50px' height='50px' className='rounded-xl' src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"  />
                </div> 
            </div>
        </div>
        <div className="row-span-2  flex flex-wrap gap-4 px-1 justify-start">
            {/* {[1,2,3,4,5,6,7].map((item, index)=> {
                return (
                    <div className='flex-1 min-w-20 max-w-30 bg-white h-30 flex flex-col justify-between items-center p-3 rounded-xl'>
                        <div>Sun</div>
                        <div>img</div>
                        <div>15 C</div>
                    </div>
                )
            })} */}
            {weekData?.slice(1)?.map((item, index)=> {
                const date = new Date(item.dt * 1000);
                const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
                const maxTemp = parseInt(item.temp.max);
                const minTemp = parseInt(item.temp.min);
                const weatherDescription = item.weather[0].description;
                const weatherIconCode = item.weather[0].icon;
                return (
                    <div className='flex-1 min-w-20 max-w-30 bg-white h-30 flex flex-col justify-between items-center p-3 rounded-xl'>
                        <div>{day}</div>
                        <div>
                            <img src={`https://openweathermap.org/img/wn/${weatherIconCode}@4x.png`}/>
                        </div>
                        <div>
                            <span>{maxTemp}°</span>{" "}
                            <span className='text-gray-500'>{minTemp}°</span>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="row-span-7 row-start-4 flex flex-col ">
            <div className='text-xl font-medium py-5'>Today's Highlights</div>
            
            <div className="grid grid-cols-3 grid-rows-2 gap-4 p-1 auto-cols-fr	">
    
                    <div className='flex-1 min-w-20 max-w-30 bg-white h-56 flex flex-col justify-between  py-6 px-8 rounded-3xl'>
                        <div className='text-[#979797]'>UV Index</div>
                        {/* <div>img</div>
                        <div>15 C</div> */}
                        <div className='text-6xl'>{todayData?.uvi}</div>
                    </div>

                    <div className='flex-1 min-w-20 max-w-30 bg-white h-56 flex flex-col justify-between  py-6 px-8 rounded-3xl'>
                        <div className='text-[#979797]'>Wind Status</div>
                        {/* <div>img</div> */}
                        <div className='text-5xl'>{todayData?.wind_speed}Km/h</div>
                    </div>

                    <div className='flex-1 min-w-20 max-w-30 bg-white h-56 flex flex-col justify-between  py-6 px-8 rounded-3xl'>
                        <div className='text-[#979797]'>Sunrise & Sunset</div>
                        {/* <div>img</div> */}
                        <div>{sunriseTime}</div>
                        <div>{sunsetTime}</div>
                    </div>

                    <div className='flex-1 min-w-20 max-w-30 bg-white h-56 flex flex-col justify-between  py-6 px-8 rounded-3xl'>
                        <div className='text-[#979797]'>Humidity</div>
                        {/* <div>img</div> */}
                        <div className='text-5xl'>{todayData?.humidity}%</div>
                    </div>

                    <div className='flex-1 min-w-20 max-w-30 bg-white h-56 flex flex-col justify-between  py-6 px-8 rounded-3xl'>
                        <div className='text-[#979797]'>Visibility</div>
                        {/* <div>img</div> */}
                        <div className='text-5xl'>{weatherData?.visibility / 1000} Km</div>
                    </div>

                    <div className='flex-1 min-w-20 max-w-30 bg-white h-56 flex flex-col justify-between  py-6 px-8 rounded-3xl'>
                        <div className='text-[#979797]'>Air Quality</div>
                        {/* <div>img</div> */}
                        <div className='text-5xl'>105</div>
                        <div className='text-gray'>Unhealthy</div>
                    </div>
            
            </div>
    
        </div>
    </div>
)
}

export default Main