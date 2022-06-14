import '../style/weather.css';
import {useState, useEffect} from 'react';
import moment from 'moment';

function Weather() {

    const API_Key = 'f47308fffabb6b503979991b847193b5';

    const [dataCurrent, setDataCurrent] = useState();
    const [dataFuture, setDataFuture] = useState([]);

    const getWeatherDataCurrent = () => {
        // navigator.geolocation.getCurrentPosition((data) => {
        //     let {latitude, longitude} = data.coords;
            // console.log(latitude, longitude);
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=21&lon=105&units=metric&appid=${API_Key}`)
            .then(response => response.json())
            .then(data => setDataCurrent(data));
        // })
    }

    const getWeatherDataFuture = () => {
        // navigator.geolocation.getCurrentPosition((data) => {
        //     let {latitude, longitude} = data.coords;
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=21&lon=105&exclude=hourly,minutely&units=metric&appid=${API_Key}&lang=vi`)
            .then(response => response.json())
            .then(data => setDataFuture(data.daily));
        // })
    }

    useEffect(() => {
        getWeatherDataCurrent();
        getWeatherDataFuture();

        setInterval(getWeatherDataCurrent, 5*60*1000);
        setInterval(getWeatherDataFuture, 60*60*1000);
    }, []);

    return (
        <div className="weather-wrap">
            {
                dataCurrent?.weather[0]?.icon &&
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