import moment from "moment";
import '../style/select-day.css';

function SelectDay({ daySelect, setDaySelect }) {

    const d = new Date();
    const dayNow = d.getDay();

    const dayOfWeek = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    const handleSelectDay = (day) => {
        setDaySelect(day);
    }

    return (
        <div className="list-day-select">
            {
                dayOfWeek.map((item, index) => {
                    let day = moment().add(index - dayNow,'days').format('DD');
                    return (
                        <div
                            key={index}
                            className={`day-of-week-wrap_body ${daySelect === index ? 'day-focus' : ''}`}
                            onClick={() => handleSelectDay(index)}
                        >
                            <div className="day-of-week_body">{item}</div>
                            <div className="date_body">{day}</div>
                            {
                                daySelect === index && <div className="dot" />
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SelectDay;