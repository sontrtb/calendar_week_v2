import '../style/weather.css';
import {useState, useEffect, useContext} from 'react';
import moment from 'moment';
import {API_Key} from "../config/connfig";
import {WeatherContext} from "../App";
import axios from 'axios';

function Weather() {
    
    const [dataFuture, setDataFuture] = useState([]);

    const dataCurrent = useContext(WeatherContext);

    const getWeatherDataFuture = () => {
        // navigator.geolocation.getCurrentPosition((data) => {
        //     let {latitude, longitude} = data.coords;
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=21&lon=105&exclude=hourly,minutely&units=metric&appid=${API_Key}&lang=vi`)
            .then(res => setDataFuture(res.data.daily))
            .catch(err => console.log(err));
        // })
    }

    useEffect(() => {
        getWeatherDataFuture();
        setInterval(getWeatherDataFuture, 60*60*1000);
    }, []);

    return (
        <div className="weather-wrap">
            {
                dataCurrent &&
                <div className='weather-current'>
                    <img src={dataCurrent.condition.icon} alt='thoi tiet' />
                    <div>{dataCurrent.temp_c}°C</div>
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