import React, { useEffect, useState } from 'react';
import { Card, Button, List, InputNumber, Row, Col } from 'antd';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [allCart, setAllCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const username = localStorage.getItem('username');
    if (storedCart.length > 0) {
      setAllCart(storedCart);
      const userCart = storedCart.filter(item => item.username === username);
      setCart(userCart);
    }
  }, []);

  const updateQuantity = (id, amount) => {
    const updatedCart = allCart.map(item => {
      if (item.id === id) {
        const newAmount = amount > item.maxNumber ? item.maxNumber : amount;
        return { ...item, amount: newAmount };
      }
      return item;
    });
    setAllCart(updatedCart);
    const userCart = updatedCart.filter(item => item.username === localStorage.getItem('username'));
    setCart(userCart);
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = allCart.filter(item => item.id !== id);
    setAllCart(updatedCart);
    const userCart = updatedCart.filter(item => item.username === localStorage.getItem('username'));
    setCart(userCart);
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    const updatedCart = allCart.filter(item => item.username !== localStorage.getItem('username'));
    setAllCart(updatedCart);
    setCart([]);
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.amount, 0);

  const handleJiesuan = () => {
    // 处理结算逻辑
  }

  return (
    <Card title="购物车" style={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
      <List
        itemLayout="horizontal"
        dataSource={cart}
        renderItem={item => (
          <List.Item
            actions={[
              <InputNumber
                min={1}
                max={item.maxNumber}
                value={item.amount}
                onChange={value => updateQuantity(item.id, value)}
              />,
              <Button
                type="primary"
                danger
                onClick={() => removeFromCart(item.id)}
              >
                删除
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<img src={item.img} alt={item.productName} style={{ width: 50 }} />}
              title={item.productName}
              description={`价格: ¥${item.price}`}
            />
          </List.Item>
        )}
      />
      <Row justify="space-between" style={{ marginTop: 20 }}>
        <Col>
          <Button type="default" onClick={clearCart}>清空</Button>
        </Col>
        <Col>
          <span style={{ fontSize: 16 }}>总计: ¥{totalAmount}</span>
        </Col>
        <Col>
          <Button type="primary" onClick={handleJiesuan}>去结算</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ShoppingCart;
