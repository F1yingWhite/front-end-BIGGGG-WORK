import React, { useState } from 'react';
import { Form, Input, Button, Tabs, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { passwordValid, emailValid } from '../../utils/userInfoVaild';

export function Login() {
  const [activeKey, setActiveKey] = useState('1');
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      const response = await axios.post('/api/auth/login', {
        username: values.username,
        password: values.password, // 直接传输纯文本密码
      });
      const user = response.data.user;
      message.success('登录成功', 3);
      localStorage.setItem('isLogin', 'true'); // 设置登录状态
      localStorage.setItem('username', user.username); // 设置用户名
      localStorage.setItem('privilege', user.privilege); // 设置权限
      navigate('/manage/dashboard'); // 跳转到首页
    } catch (error) {
      message.error('用户名或密码错误', 3);
    }
  };

  const register = async (values) => {
    try {
      await axios.post('/api/auth/register', {
        username: values.username,
        password: values.password, // 直接传输纯文本密码
        email: values.email,
      });
      message.success('注册成功', 3);
      setActiveKey('1');
    } catch (error) {
      message.error('注册失败', 3);
    }
  };

  const items = [
    {
      key: '1',
      label: <Typography.Title level={3}>登录</Typography.Title>,
      children: (
        <Form
          onFinish={(values) => {
            login(values);
          }}
          labelCol={{
            span: 8,
          }}
          style={{ marginLeft: '-100px' }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              passwordValid,
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item style={{ marginLeft: '290px' }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: <Typography.Title level={3}>注册</Typography.Title>,
      children: (
        <Form
          onFinish={(values) => {
            register(values);
          }}
          labelCol={{
            span: 8,
          }}
          style={{ marginLeft: '-100px' }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: '请输入邮箱',
              },
              emailValid,
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              passwordValid,
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="再次输入密码"
            name="repeatpassword"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: '请再次输入密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') !== value) {
                    return Promise.reject('两次输入的密码不一致！');
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item style={{ marginLeft: '290px' }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={setActiveKey} centered items={items} />
      </div>
    </div>
  );
}
