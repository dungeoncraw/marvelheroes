import React from 'react';
import Title from 'antd/lib/typography/Title';
import { List, Row, Col } from 'antd';
import stanLee from '../assets/StanLee.jpg';
import { LinkOutlined } from '@ant-design/icons';

interface InstalledPackages {
    name: string;
    description: string;
    url: string;
};
const AboutComponent = () => {
    const dataSource: InstalledPackages[] = [
        { name: 'antd', description: 'A design system for enterprise-level products. Create an efficient and enjoyable work experience.', url: 'https://ant.design/' },
        { name: 'axios', description: 'Promise based HTTP client for the browser and node.js', url: 'https://github.com/axios/axios'},
        { name: 'react-redux', description: 'Official React bindings for Redux.', url: 'https://react-redux.js.org/'},
        { name: 'react-router-dom', description: 'React Router is a collection of navigational components that compose declaratively with your application.', url: 'https://reacttraining.com/react-router/'},
        { name: 'redux', description: 'A Predictable State Container for JS Apps.', url: 'https://redux.js.org/'},
        { name: 'redux-saga', description: 'Is a library that aims to make application side effects easier to manage.', url: 'https://github.com/redux-saga/redux-saga'},
        { name: 'redux-thunk', description: 'Thunk middleware for Redux.', url: 'https://github.com/reduxjs/redux-thunk'},
        { name: 'typesafe-actions', description: 'Typesafe utilities designed to reduce types verbosity and complexity in Redux Architecture.', url: 'https://github.com/piotrwitek/typesafe-actions'},
    ];
    return (
        <div className="h-about">
            <Title>Marvel Heroes List</Title>
            <Title level={2}>Developer - 
                <a href="https://www.linkedin.com/in/thiagorrnascimento/" target="_blank" rel="noopener noreferrer">
                    Thiago Nascimento
                </a>
            </Title>
            <Row gutter={12}>
                <Col xs={24} sm={12}>
                    <List
                        bordered={true}
                        header="Packages"
                        dataSource={dataSource}
                        renderItem={item => (
                            <List.Item>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <LinkOutlined />{item.name}
                                </a>
                                : {item.description}
                            </List.Item>
                        )}
                    />
                </Col>
                <Col xs={24} sm={12}>
                    <img src={stanLee} className="centered-img" alt="Stan lee cameo"/>
                </Col>
            </Row>
        </div>
    )
};

export default AboutComponent;