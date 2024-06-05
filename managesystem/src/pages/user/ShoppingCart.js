import React, { useState } from 'react';
import { Card, Button, List, InputNumber, Row, Col } from 'antd';

const products = [
  {
    id: 1,
    name: 'huawei ',
    variant: 'mate 60 ',
    color: '白沙银',
    storage: '128G',
    price: 8848,
    img: '/assets/mate60_3.png', // Replace with actual image URL
  },
];

const ShoppingCart = () => {
  const [cart, setCart] = useState(products.map(product => ({ ...product, quantity: 1 })));

  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

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
                value={item.quantity}
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
              avatar={<img src={item.img} alt={item.name} style={{ width: 50 }} />}
              title={`${item.name} ${item.variant}`}
              description={`颜色: ${item.color}, 容量: ${item.storage}, 价格: ¥${item.price}`}
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
          <Button type="primary">去结算</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ShoppingCart;
