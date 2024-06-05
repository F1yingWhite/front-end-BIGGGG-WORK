import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export function PaymentConfirmPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handlePaymentSuccess = () => {
        navigate(`/user/dashboard/paymentSuccess/${id}`);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>确认付款</h1>
            <p style={styles.instruction}>请确认您的付款已完成：</p>
            <Button type="primary" onClick={handlePaymentSuccess} style={styles.button}>确认</Button>
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
    instruction: {
        fontSize: '18px',
        marginBottom: '20px',
        color: '#555',
    },
    button: {
        width: '80%',
        backgroundColor: '#ffa500',
        borderColor: '#ffa500',
    },
};
