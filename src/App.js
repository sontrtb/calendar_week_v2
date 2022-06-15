import './App.css';
import Header from './layout/Header';
import Content from './layout/Content';
import Footer from './layout/Footer';
import { createContext, useState, useEffect } from 'react';
import { API_Key } from './config/connfig';
import axios from 'axios';

export const WeatherContext = createContext();

function App() {

  const weatherIdIcon = ['01', '02', '03', '04', '09', '10', '11', '13', '50'];
  const weatherBackground = [
      'background_content-clear_sky',
      'background_content-few_clouds',
      'background_content-scattered_clouds',
      'background_content-broken_clouds',
      'background_content-shower_rain',
      'background_content-rain',
      'background_content-thunderstorm',
      'background_content-snow',
      'background_content-mist'
  ];

  const [dataCurrent, setDataCurrent] = useState();

  const getWeatherDataCurrent = () => {
    // navigator.geolocation.getCurrentPosition((data) => {
    //     let {latitude, longitude} = data.coords;
        // console.log(latitude, longitude);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=21&lon=105&units=metric&appid=${API_Key}`)
        .then(res => setDataCurrent(res.data))
        .catch(err => console.log(err));
    // })
  }

  useEffect(() => {
    getWeatherDataCurrent();
    setInterval(getWeatherDataCurrent, 5*60*1000);
  }, []);

  const backgroundMain = ( weatherIcon ) => {
    if(!weatherIcon) return;
    const weatherId = weatherIcon.slice(0, 2);
    for(let i = 0; i < weatherIdIcon.length; i++) {
        if(weatherId === weatherIdIcon[i])
          return weatherBackground[i]
    };
    return;
  };

  return (
    <WeatherContext.Provider value={dataCurrent}>
      <div className="App">
        <div
          id='main'
          className={backgroundMain(dataCurrent?.weather[0].icon)}
        >
          <Header />
          <Content />
          <Footer />
        </div>
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
