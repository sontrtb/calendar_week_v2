import '../style/weather.css';
import {useState, useEffect, useContext} from 'react';
import moment from 'moment';
import {API_Key} from "../config/connfig";
import {WeatherContext} from "../App";

function Weather() {
    
    const [dataFuture, setDataFuture] = useState([]);

    const dataCurrent = useContext(WeatherContext);

    const getWeatherDataFuture = () => {
        // navigator.geolocation.getCurrentPosition((data) => {
        //     let {latitude, longitude} = data.coords;
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=21&lon=105&exclude=hourly,minutely&units=metric&appid=${API_Key}&lang=vi`)
            .then(response => response.json())
            .then(data => setDataFuture(data.daily));
        // })
    }

    useEffect(() => {
        getWeatherDataFuture();
        setInterval(getWeatherDataFuture, 60*60*1000);
    }, []);

    return (
        <div className="weather-wrap">
            {
                dataCurrent?.weather &&
                <div className='weather-current'>
                    <img src={`http://openweathermap.org/img/wn/${dataCurrent.weather[0].icon}@4x.png`} alt='thoi tiet' />
                    <div>{dataCurrent.main.temp.toFixed(0)}°C</div>
                </div>
                
            }
            <div className='weather-future'>
                {
                    dataFuture?.map((item, index) => (
                        index < 5 && index > 0 &&
                        <div className="weather-future-wrap" key={index}>
                            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt='thoi tiet'/>
                            <div className='tem-wrap_weather-future'>
                                <div>{item.temp.min.toFixed(0)}°</div>
                                <div>{item.temp.max.toFixed(0)}°</div>
                            </div>
                            <div>{moment(item.dt*1000).format('DD / MM')}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Weather;