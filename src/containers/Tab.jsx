import React from 'react';
import { Tabs } from 'antd';
import Todo from '../components/Todo';
import User from '../components/User';

const { TabPane } = Tabs;

const Tab = () => {
    return(
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Todos" key="1">
                    <Todo />
                </TabPane>
                <TabPane tab="Users" key="2">
                    <User />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Tab;