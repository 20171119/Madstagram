import React from 'react'
import Axios from 'axios';
import { Col, Card, Row, Layout, Menu, Avatar } from 'antd';
import { UserOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Sider } = Layout;

function Slider() {
    

    return (
        <Sider style={{position: 'fixed'}}>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
            >
                <Menu.Item key="sub1" >
                    {}
                </Menu.Item>
                <Menu.Item key="sub2" />
                <Menu.Item key="sub3" />
            </Menu>
        </Sider>
    )
}

export default Slider
