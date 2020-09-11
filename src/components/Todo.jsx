import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, InputNumber, Popconfirm, Form, Button, Space } from 'antd';
import { addTodo, editTodo, deleteTodo } from '../actions';
import CreateModal from '../containers/CreateModal';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const Todo = () => {
    const [form] = Form.useForm();
    const todoData = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const [createDialogTitle, setCreateDialogTitle] = useState('');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showCreateLoading, setShowCreateLoading] = useState(false);

    const [editingKey, setEditingKey] = useState('');
    const isEditing = record => record.key === editingKey;

    const edit = record => {
        form.setFieldsValue({
            name: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...todoData];
            const index = newData.findIndex(item => key === item.key);
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            dispatch(editTodo(newData[index]));
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const wait = async (duration) => {
        await new Promise(resolve => setTimeout(resolve, duration));
    }

    const handleCreateModal = () => {
        setCreateDialogTitle('Create Todo');
        setShowCreateDialog(true);
    };

    const handleCreateSave = async (event, body) => {
        event.preventDefault();
        setShowCreateLoading(true);
        await wait(2000);

        // let dt = new Date();
        // let currentDate = String(dt.getDate()).padStart(2,"0") + '/' + 
        //                     String((dt.getMonth() + 1)).padStart(2,"0") + '/' + 
        //                     dt.getFullYear();
        const newData = {
            name: body.name,
            cdate: body.date
        };
        dispatch(addTodo(newData));
        setShowCreateDialog(false);
        setShowCreateLoading(false);
    };

    const handleCreateCancel = () => {
        setShowCreateDialog(false);
    };

    const handleDelete = (event, record) => {
        event.preventDefault();
        dispatch(deleteTodo(record))
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: "40%",
            editable: true,
            render(text, record) {
                return {
                    props: {
                        style: { color: text ? '#4b4b4b' : '' }
                    },
                    children: <div>{text}</div>
                };
            }
        },
        {
            title: 'Created Date',
            dataIndex: 'cdate',
            width: "40%",
            editable: false,
            render(text, record) {
                return {
                    props: {
                        style: { color: text ? '#4b4b4b' : '' }
                    },
                    children: <div>{text}</div>
                };
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: "20%",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space size="middle">
                        <a
                            href="#/"
                            onClick={(e) => {e.preventDefault(); save(record.key);}}
                        >
                            Save
                        </a>
                        <Popconfirm
                            title="Are you sure to cancel?"
                            onConfirm={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a href="#/">Cancel</a>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Space size="middle">
                        <a href="#/" disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </a> 
                        <span style={{color: '#969696'}}>
                            |
                        </span>
                        <Popconfirm 
                            title="Are you sure to delete this item?"
                            onConfirm={(event) => handleDelete(event, record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a href="#/" disabled={editingKey !== ''}>Delete</a>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div>
            <div style={{padding: '5px 0px 15px 0px', textAlign: 'left'}}>
                <Button onClick={handleCreateModal}>
                    Create Todo
                </Button>
            </div>
            <CreateModal
                title={createDialogTitle}
                isVisible={showCreateDialog}
                isLoading={showCreateLoading}
                onClickSave={handleCreateSave}
                onClickCancel={handleCreateCancel}
            />
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    dataSource={todoData}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>
    );
};

export default Todo;