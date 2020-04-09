import React from 'react';
import { Layout, Typography } from 'antd';
import marvelLogo from '../assets/MarvelLogo.png';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

interface Props {
  children: React.ReactNode;
}
const AppLayout = React.memo((props: Props) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, textAlign: 'center' }}>
          <Title level={1}>Marvel Hero List</Title>
          <img src={marvelLogo} className="logo" alt="Marvel logo"/>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Marvel Hero List ©2020 Created by TNAscimento
          <a href="http://marvel.com"> Data provided by Marvel. © 2020 MARVEL</a></Footer>
      </Layout>
    </Layout>
  );
});

export default AppLayout;