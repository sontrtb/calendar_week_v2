import { Button, Modal, Input, TimePicker, notification } from 'antd';
import { useState, useRef, useEffect } from 'react';
import {PlusCircleOutlined} from '@ant-design/icons';
import '../../style/modal-add.css'
import axios from 'axios';
import { API } from '../../config/connfig';

function ModalAdd({isModalVisible, toggerModal, daySelect, refetchListCalendar}) {

    const [note, setNote] = useState('');
    const [itemAdd, setItemAdd] = useState({dayOfWeek: daySelect});

    const listNote = useRef([]);

    useEffect(() => {
        setItemAdd({dayOfWeek: daySelect});
    }, [daySelect])

    const handleOk = () => {
        if(!itemAdd.title || !itemAdd.timeString)
            return;

        axios.post(API, itemAdd)
          .then(res => {
            notification.success({
                message: 'Thêm thành công',
            });
            refetchListCalendar();
            setItemAdd({dayOfWeek: daySelect});
            toggerModal();
            setNote('');
            listNote.current = [];
          })
          .catch(err => console.log(err));
    }

    const handleCancel = () => {
        toggerModal();
        setItemAdd({dayOfWeek: daySelect});
        setNote('');
        listNote.current = [];
    }

    const handleAddNote = () => {
        if(!note || note.length===0)
            return;
        listNote.current[listNote.current.length] = note;
        setItemAdd({...itemAdd, listNote: listNote.current})
        setNote('');
    }


    return (
        <Modal
            title="Thêm sự kiện"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={
                <div>
                    <Button type="primary" danger onClick={handleCancel}>
                        Hủy
                    </Button>
                    <Button type="primary" onClick={handleOk}>
                        Thêm
                    </Button>
                </div>
            }
        >
            <div>
                <h2>Tiêu đề:</h2>
                <Input.TextArea
                    placeholder='Công việc chính ...'
                    value={itemAdd.title}
                    onChange={e => setItemAdd({...itemAdd, title: e.target.value})}
                />

                <h2 className='title_modal-add'>Ghi chú:</h2>
                <ul className='list-note-add'>
                    {
                        listNote.current.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                    }
                </ul>
                <div className='add-note-wrap'>
                    <Input.TextArea 
                        placeholder='Ghi chú ...'
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    />
                    <div onClick={handleAddNote}>
                        <PlusCircleOutlined className='icon-add-note'/>
                    </div>
                </div>

                <div style={{marginTop: '20px', display: 'flex'}}>
                    <h2 style={{marginRight: '30px'}}>Thời gian:</h2>
                    <TimePicker 
                        format={'HH:mm'}
                        value={itemAdd.time}
                        onChange={(time, timeString) => setItemAdd({...itemAdd, timeString: timeString, time: time})}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default ModalAdd;