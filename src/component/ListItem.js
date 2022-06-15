import axios from 'axios';
import {useState, useEffect, useRef} from 'react';
import {API} from '../config/connfig';
import '../style/list-item.css';
import {
    CheckSquareOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import ModalAdd from './modal/ModalAdd';
import {notification} from 'antd';

function ListItem({ daySelect }) {

    const [listCalendar, setListCalendar] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
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
        axios.delete(API + "/" + id)
        .then(res => {
            refetchListCalendar();
            notification.success({
                message: 'Xóa thành công',
            });
        })
        .catch(err => console.log(err))
    }

    const toggerModal = () => {
        setIsModalVisible(!isModalVisible);
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

            <div className='add-item' onClick={toggerModal}>
                <PlusCircleOutlined className='icon-add-item'/>
            </div>

            <ModalAdd
                isModalVisible={isModalVisible}
                toggerModal={toggerModal}
                daySelect={daySelect}
                refetchListCalendar={refetchListCalendar}
            />
        </div>
    )
}

export default ListItem;