import './App.css';
import Header from './layout/Header';
import Content from './layout/Content';
import Footer from './layout/Footer';
import { createContext, useState, useEffect } from 'react';
import { API_Key_CUR } from './config/connfig';
import axios from 'axios';

export const WeatherContext = createContext();

function App() {

  const weatherBackground = [
      'background_content-1',
      'background_content-2',
      'background_content-3',
  ];

  const d = new Date();

  const [dataCurrent, setDataCurrent] = useState();

  const getWeatherDataCurrent = () => {
    // navigator.geolocation.getCurrentPosition((data) => {
    //     let {latitude, longitude} = data.coords;
    //     console.log(latitude, longitude);
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_Key_CUR}&q=21.0367536,105.8407837&lang=vi`)
        .then(res => setDataCurrent(res.data.current))
        .catch(err => console.log(err));
    // })
  }

  useEffect(() => {
    getWeatherDataCurrent();
    setInterval(getWeatherDataCurrent, 5*60*1000);
  }, []);

  const backgroundMain = () => {
    const lengthBackground = weatherBackground.length;
    const day = d.getDate();
    return weatherBackground[lengthBackground%day - 1];
  };

  console.log(backgroundMain());

  return (
    <WeatherContext.Provider value={dataCurrent}>
      <div className="App">
        <div
          id='main'
          // className={backgroundMain()}
          className="background_content"
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
