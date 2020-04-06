import React from 'react';
import { Layout, Typography } from 'antd';
import SideMenu from './SideMenu';


const { Title } = Typography;
const { Header, Content, Footer } = Layout;

interface Props {
    children: React.ReactNode;
}
const AppLayout = React.memo((props: Props) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenu />
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <Title level={2}>Marvel Hero List</Title>
            </Header>
            <Content style={{ margin: '0 16px' }}>
                {props.children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Marvel Hero List ©2020 Created by TNAscimento</Footer>
          </Layout>
        </Layout>
      );
});

export default AppLayout;