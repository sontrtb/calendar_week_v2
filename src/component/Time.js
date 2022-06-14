import {useState} from 'react';
import '../style/time.css';

function Time() {

    const d = new Date();

    const [hour, setHour] = useState(d.getHours());
    const [min, setMin] = useState(d.getMinutes());
    const [sec, setSec] = useState(d.getSeconds());

    const updateTime = () => {
        const d = new Date();
        setHour(d.getHours());
        setMin(d.getMinutes());
        setSec(d.getSeconds());
    }

    setInterval(updateTime, 1000);

    return (
        <div className='time_header'>
            <span>{hour < 10 ? `0${hour}`: hour}</span>:
            <span>{min < 10 ? `0${min}`: min}:</span>
            <span>{sec < 10 ? `0${sec}`: sec}</span>
        </div>
    )
}

export default Time;