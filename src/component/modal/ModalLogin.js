import { Button, Modal, Input, notification } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import {API_ACCOUNT} from "../../config/connfig";

function ModalLogin({ isModalVisible, toggerModal}) {

    const accountInit = {
        username: '',
        password: '',
    };
    const [account, setAccount] = useState(accountInit);

    const handleCancel = () => {
        toggerModal();
        setAccount(accountInit);
    }

    const handleOk = () => {
        if(account === accountInit) return;

        axios.post(API_ACCOUNT, account)
          .then(res => {
            notification.success({
                message: 'Đăng nhập thành công',
            });
            localStorage.setItem('token' , res.data.token);
            toggerModal();
          })
          .catch(err => {
            notification.error({
                message: 'Đăng nhập thất bại',
                description: err.response?.data,
            });
          });
    }

    return (
        <Modal
            title="Vui lòng đăng nhập"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={
                <div>
                    <Button type="primary" danger onClick={handleCancel}>
                        Hủy
                    </Button>
                    <Button type="primary" onClick={handleOk}>
                        Đăng nhập
                    </Button>
                </div>
            }
        >
            <div>
                <h2>Tên tài khoản</h2>
                <Input
                    placeholder='Tên tài khoản'
                    value={account.username}
                    onChange={e => setAccount({...account, username: e.target.value})}
                />

                <h2>Mật khẩu</h2>
                <Input
                    placeholder='Mật khẩu'
                    type='password'
                    value={account.password}
                    onChange={e => setAccount({...account, password: e.target.value})}
                />
            </div>
        </Modal>
    )
}

export default ModalLogin;