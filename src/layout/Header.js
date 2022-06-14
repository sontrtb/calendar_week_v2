import logo from '../image/Logo_PTIT.png'
import Time from '../component/Time';
import Weather from '../component/Weather';
import '../style/header.css';

function Header() {

    const d = new Date();

    const dayOfWeek = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    return (
        <div className="header">
            <div className='left_header'>
                <img src={logo} alt="logo PTIT" className='logo_header'/>
                <div className='date-present'>
                    <span>{d.getDate()}</span>.
                    <span>{d.getMonth() + 1}</span>.
                    <span>{d.getFullYear()}</span>
                </div>
                <div className='date-present'>{dayOfWeek[d.getDay()]}</div>
            </div>
            <div className='right_header'>
                <Time />
                <Weather />
            </div>
        </div>
    )
}

export default Header;