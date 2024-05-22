import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function OrderControl() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [addOrderVisible, setAddOrderVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const currentUser = localStorage.getItem('username');
  const userPrivilege = localStorage.getItem('privilege');

  useEffect(() => {
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:6001/api/orders');
      const ordersData = response.data;
      const filtered = userPrivilege === '管理员' ? ordersData : ordersData.filter(order => order.sellerId === currentUser);
      setOrders(filtered);
      setFilteredOrders(filtered);
    } catch (error) {
      console.error('获取订单数据失败:', error);
      message.error('获取订单数据失败');
    }
  };

  const editOrder = (order) => {
    setEditingOrder(order);
    setAddOrderVisible(true);
    form.setFieldsValue(order);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      let updatedOrders;

      if (editingOrder) {
        await axios.put(`http://localhost:6001/api/orders/${editingOrder.productId}`, values);
        updatedOrders = orders.map(order => order.productId === editingOrder.productId ? { ...order, ...values } : order);
        message.success('修改订单成功');
      } else {
        const newOrder = { ...values, id: Date.now().toString() };
        await axios.post('http://localhost:6001/api/orders', newOrder);
        updatedOrders = [...orders, newOrder];
        message.success('添加订单成功');
      }

      setOrders(updatedOrders);
      setFilteredOrders(userPrivilege === '管理员' ? updatedOrders : updatedOrders.filter(order => order.sellerId === currentUser));
      setAddOrderVisible(false);
    } catch (error) {
      console.error('操作订单失败:', error);
      message.error('操作订单失败');
    }
  };

  const handleCancel = () => {
    setAddOrderVisible(false);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = orders.filter(order => order.productName.toLowerCase().includes(searchValue));
    setFilteredOrders(userPrivilege === '管理员' ? filteredData : filteredData.filter(order => order.sellerId === currentUser));
  };

  const columns = [
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Product ID', dataIndex: 'productId', key: 'productId' },
    { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => editOrder(record)}>Edit</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input.Search
          placeholder="根据商品名搜索"
          onChange={handleSearch}
          style={{ width: '25%' }}
        />
      </div>
      <Table dataSource={filteredOrders} columns={columns} rowKey="productId" pagination={{ pageSize: 7 }} />
      <Modal title="修改订单" open={addOrderVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="orderForm">
          <Form.Item name="userId" label="User ID" rules={[{ required: true, message: '请输入用户ID' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="productId" label="Product ID" rules={[{ required: true, message: '请输入产品ID' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="productName" label="Product Name" rules={[{ required: true, message: '请输入产品名称' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: '请输入地址' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="time" label="Time" rules={[{ required: true, message: '请输入时间' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true, message: '请输入数量' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: '请输入价格' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: '请输入状态' }]}>
            <Select>
              <Select.Option value="付款">付款</Select.Option>
              <Select.Option value="发货">发货</Select.Option>
              <Select.Option value="收货">收货</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
