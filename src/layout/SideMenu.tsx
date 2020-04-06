import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    QuestionOutlined,
    HomeOutlined
  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Routes } from '../constants/routes';

const { Sider } = Layout;
const SideMenu = () => {
    const [collapsed, setCollapse] = useState<boolean>(false);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="home">
                    <HomeOutlined />
                    <span>Home</span>
                    <Link to={Routes.Home} />
                </Menu.Item>
                <Menu.Item key="about">
                    <QuestionOutlined />
                    <span>About</span>
                    <Link to={Routes.About} />
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default SideMenu;