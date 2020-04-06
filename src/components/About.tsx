import React from 'react';
import Title from 'antd/lib/typography/Title';
import { List, Row, Col } from 'antd';

interface InstalledPackages {
    name: string;
    url: string;
};
const AboutComponent = () => {
    const dataSource: InstalledPackages[] = [
        { name: 'antd', url: 'https://ant.design/' },
        { name: 'react-router-dom', url: 'https://reacttraining.com/react-router/web/guides/quick-start'},
        { name: 'redux', url: 'https://redux.js.org/'}
    ];
    return (
        <div className="h-about">
            <Title>Marvel Heroes List</Title>
            <Title level={2}>Developer - Thiago Nascimento</Title>
            <Row>
                <Col span={12}>
                    <List
                        bordered={true}
                        header="Packages"
                        dataSource={dataSource}
                        renderItem={item => (
                            <List.Item>
                                <a href={item.url} target="_blank">
                                    {item.name}
                                </a>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    )
};

export default AboutComponent;