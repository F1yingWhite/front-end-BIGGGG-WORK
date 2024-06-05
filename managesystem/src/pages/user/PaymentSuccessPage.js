import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export function PaymentSuccessPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleViewOrder = () => {
    navigate(`/user/dashboard/orderDetails/${id}`);
  };

  const handleBackHome = () => {
    navigate('/user/dashboard/home');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>支付成功</h1>
      <Button type="primary" onClick={handleViewOrder} style={styles.button}>查看订单</Button>
      <Button onClick={handleBackHome} style={styles.button}>返回首页</Button>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: '26px',
    marginBottom: '20px',
    color: '#333',
  },
  button: {
    width: '80%',
    backgroundColor: '#ffa500',
    borderColor: '#ffa500',
    marginBottom: '10px',
  },
};
