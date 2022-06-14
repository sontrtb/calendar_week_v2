import {useState} from 'react';
import '../style/time.css';

function Time() {

    const d = new Date();

    const [hour, setHour] = useState(d.getHours());
    const [min, setMin] = useState(d.getMinutes());
    const [sec, setSec] = useState(d.getSeconds());

    const updateTime = () => {
        const d = new Date();
        const hourNow = d.getHours();
        const minNow  = d.getMinutes();
        const secNow = d.getSeconds();

        setHour(d.getHours());
        setMin(d.getMinutes());
        setSec(d.getSeconds());
    }

    setInterval(updateTime, 1000);

    return (
        <div className='time_header'>
            <span>{hour}</span>:
            <span>{min}:</span>
            <span>{sec}</span>
        </div>
    )
}

export default Time;