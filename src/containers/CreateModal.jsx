import React, { useState } from 'react';
import moment from 'moment';
import { Modal, Button, Input, DatePicker, Space } from 'antd';

const CreateModal = ({ ...props }) => {
    const { title, isVisible, isLoading, onClickSave, onClickCancel } = props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [body, setBody] = useState({
        name: '',
        email: '',
        date: ''
    })

    const handleChangeName = event => {
        setName(event.target.value);
        setBody({
            ...body,
            name: event.target.value
        });
    }

    const handleChangeEmail = event => {
        setEmail(event.target.value);
        setBody({
            ...body,
            email: event.target.value
        });
    }

    const handleChangeDate = (date, dateString) => {
        setDate(dateString);
        setBody({
            ...body,
            date: dateString
        });
    }

    const resetFields = () => {
        setName('');
        setEmail('');
        setDate('');
    }

    return (
        <Modal
            title={title}
            visible={isVisible}
            onOk={onClickSave}
            onCancel={onClickCancel}
            afterClose={resetFields}
            footer={[
                <Button key="back" onClick={onClickCancel}>
                    Cancel
                </Button>,
                <Button 
                    key="submit"
                    type="primary"
                    loading={isLoading}
                    disabled={
                        title !== 'Create Todo'
                        ?   !name || !email
                        :   !name || !date
                    }
                    onClick={(e)=>props.onClickSave(e, body)}
                >
                    Save
                </Button>,
            ]}
        >
            <Space direction="vertical" size={20} style={{width: '100%'}}>
                <Input 
                    placeholder="Name"
                    value={name}
                    onChange={handleChangeName}
                />
                {
                    title !== 'Create Todo'
                    ?    <Input 
                            placeholder="Email"
                            value={email}
                            onChange={handleChangeEmail}
                        />
                    :   <DatePicker
                            placeholder="Created Date"
                            format={'DD/MM/YYYY'}
                            style={{width: '100%'}}
                            value={date !== '' ? moment(date, 'DD/MM/YYYY') : null}
                            onChange={handleChangeDate}
                        />
                }
            </Space>
        </Modal>
    );
}

export default CreateModal;