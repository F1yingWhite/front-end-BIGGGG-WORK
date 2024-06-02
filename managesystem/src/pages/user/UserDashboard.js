import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { isLogin } from '../../utils/authorize';
const { Content, Footer } = Layout;

export function UserDashboard() {
  const [selectedKey, setSelectedKey] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(`/user/dashboard/${key}`);
  };

  useEffect(() => {
    if (!isLogin()) {
      navigate('/user/login')
    }
  }, [navigate])

  useEffect(() => {
    // Check if the current path is '/user/dashboard' and navigate to 'home'
    if (location.pathname === '/user/dashboard') {
      navigate('/user/dashboard/home');
      setSelectedKey('home');
    }
  }, [location, navigate]);


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '0 16px', marginTop: 64 }}>
        <Outlet />
      </Content>
      <Footer style={{ position: 'fixed', width: '100%', bottom: 0, padding: 0 }}>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-around' }}
        >
          <Menu.Item key="home" style={{ flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <HomeOutlined style={{ fontSize: '24px' }} />
              <span style={{ marginLeft: '0px' }}>主页</span>
            </div>
          </Menu.Item>
          <Menu.Item key="categories" style={{ flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <AppstoreOutlined style={{ fontSize: '24px' }} />
              <span style={{ marginLeft: '0' }}>分类</span>
            </div>
          </Menu.Item>
          <Menu.Item key="cart" style={{ flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <ShoppingCartOutlined style={{ fontSize: '24px' }} />
              <span style={{ marginLeft: '0px' }}>购物车</span>
            </div>
          </Menu.Item>
          <Menu.Item key="profile" style={{ flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <UserOutlined style={{ fontSize: '24px' }} />
              <span style={{ marginLeft: '0px' }}>个人主页</span>
            </div>
          </Menu.Item>
        </Menu>
      </Footer>
    </Layout>
  );
}