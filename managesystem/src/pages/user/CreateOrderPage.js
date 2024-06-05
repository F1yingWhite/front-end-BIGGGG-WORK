import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';

export function CreateOrderPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const selectedProduct = products.find((product) => product.id === id);
        setProduct(selectedProduct);
    }, [id]);

    const handleFinish = (values) => {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const newOrder = {
            ...values,
            id: uuidv4(),  // 使用 uuidv4() 生成唯一ID
            productId: product.id,
            productName: product.name,
            price: product.price,
            status: "待付款",
            time: new Date().toLocaleString(),
            amount: 1,
        };
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        navigate(`/user/dashboard/selectPaymentMethod/${newOrder.id}`);
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>创建订单</h1>
            <Form onFinish={handleFinish} style={styles.form}>
                <Form.Item label="商品名称" style={styles.formItem}>
                    <Input value={product.name} disabled />
                </Form.Item>
                <Form.Item label="价格" style={styles.formItem}>
                    <Input value={`￥${product.price}`} disabled />
                </Form.Item>
                <Form.Item label="收货地址" name="address" rules={[{ required: true, message: '请输入收货地址' }]} style={styles.formItem}>
                    <Input />
                </Form.Item>
                <Form.Item label="收货人姓名" name="receiverName" rules={[{ required: true, message: '请输入收货人姓名' }]} style={styles.formItem}>
                    <Input />
                </Form.Item>
                <Form.Item label="收货人电话" name="receiverPhone" rules={[{ required: true, message: '请输入收货人电话' }]} style={styles.formItem}>
                    <Input />
                </Form.Item>
                <Form.Item label="备注" name="remark" style={styles.formItem}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item style={styles.formItem}>
                    <Button type="primary" htmlType="submit" style={styles.button}>提交订单</Button>
                </Form.Item>
            </Form>
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
    form: {
        width: '100%',
    },
    formItem: {
        marginBottom: '10px',
    },
    button: {
        width: '80%',
        backgroundColor: '#ffa500',
        borderColor: '#ffa500',
        marginBottom: '10px',
    },
};
