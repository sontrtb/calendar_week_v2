import axios from 'axios';
import {useState, useEffect, useRef} from 'react';
import {API} from '../config/connfig';
import '../style/list-item.css';
import {
    CheckSquareOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
    LoadingOutlined,
    ExportOutlined,
    ImportOutlined
} from '@ant-design/icons';
import ModalAdd from './modal/ModalAdd';
import ModalLogin from './modal/ModalLogin';
import {notification} from 'antd';
import {checkLogin} from '../ultis/checkLogin';

function ListItem({ daySelect }) {

    const [listCalendar, setListCalendar] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalLoginVisible, setIsModalLoginVisible] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef(null)
    const d = new Date();

    const refetchListCalendar = () => {
        setRefetch(!refetch);
    }

    useEffect(() => {
        setLoading(true);
        axios.get(API + "/" + daySelect)
        .then(res => {
            setListCalendar(res.data)
            setLoading(false);
        })
        .catch(err => setLoading(false));
    }, [daySelect, refetch]);

    const handleDelete = (id) => {
        if(checkLogin()) {
            axios.delete(API + "/" + id)
            .then(res => {
                refetchListCalendar();
                notification.success({
                    message: 'Xóa thành công',
                });
            })
            .catch(err => console.log(err))
        } else {
            toggerModalLogin();
        }
    }

    const handleOpenModalAdd = () => {
        checkLogin() ?
        toggerModal() :
        toggerModalLogin()
    };

    const toggerModal = () => {
        setIsModalVisible(!isModalVisible);
    }

    const toggerModalLogin = () => {
        setIsModalLoginVisible(!isModalLoginVisible);
    }

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        setInterval(() => {
            if(d.getHours() > 12){
                scrollToBottom();
            }
        }, 30 * 1000);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log(checkLogin());

        notification.success({
            message: 'Đăng xuất thành công',
        });
    };

    const handleLogin = () => {
        toggerModalLogin();
    };

    return (
        <div>
            <div className='list-calendar-wrap'>
                {
                    !loading && listCalendar.map((item, index) => (
                        <div className="flex" key={index}>
                            <div className="icon-item-wrap">
                                <CheckSquareOutlined className='icon-item'/>
                                {
                                    index !== listCalendar?.length - 1 && <div className="line-item"></div>
                                }
                            </div>
                            <div className={`item_body background_item-${index}`}>
                                <div className="item-right_body">
                                    <h3>{item.title}</h3>
                                    <ul className="item-list_body">
                                        {
                                            item?.listNote?.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="item-left_body">
                                    <p className="time_item">{item.timeString}</p>
                                    <div onClick={() => handleDelete(item._id)}>
                                        <DeleteOutlined className="delete-item"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    loading && 
                    <div className='loading-wrap'>
                        <LoadingOutlined className='loading-icon'/>
                    </div>
                }
                <div ref={scrollRef} />
            </div>
            
            {
               checkLogin() ?
                <div className='logout' onClick={handleLogout}>
                    <div>
                        Đăng xuất
                    </div>
                    <ExportOutlined className='icon-logout'/>
                </div> :
                <div className='logout' onClick={handleLogin}>
                    <div>
                        Đăng nhập
                    </div>
                    <ImportOutlined className='icon-logout'/>
                </div>
            }

            <div className='add-item' onClick={handleOpenModalAdd}>
                <PlusCircleOutlined className='icon-add-item'/>
            </div>

            <ModalAdd
                isModalVisible={isModalVisible}
                toggerModal={toggerModal}
                daySelect={daySelect}
                refetchListCalendar={refetchListCalendar}
            />

            <ModalLogin
                isModalVisible={isModalLoginVisible}
                toggerModal={toggerModalLogin}
            />

        </div>
    )
}

export default ListItem;