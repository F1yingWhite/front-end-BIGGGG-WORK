import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const selectedOrder = orders.find((order) => order.id === id);
    setOrder(selectedOrder);
  }, [id]);

  const handleBackHome = () => {
    navigate('/user/dashboard/home');
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>订单详情</h1>
      <p style={styles.detail}>商品名称: {order.productName}</p>
      <p style={styles.detail}>价格: ￥{order.price}</p>
      <p style={styles.detail}>数量: {order.amount}</p>
      <p style={styles.detail}>收货地址: {order.address}</p>
      <p style={styles.detail}>收货人姓名: {order.receiverName}</p>
      <p style={styles.detail}>收货人电话: {order.receiverPhone}</p>
      <p style={styles.detail}>备注: {order.remark}</p>
      <p style={styles.detail}>订单状态: {order.status}</p>
      <p style={styles.detail}>订单时间: {order.time}</p>
      <Button type="primary" onClick={handleBackHome} style={styles.button}>返回首页</Button>
    </div>
  );
}

const styles = {
  container: {
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  detail: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    marginTop: '20px',
  },
};
