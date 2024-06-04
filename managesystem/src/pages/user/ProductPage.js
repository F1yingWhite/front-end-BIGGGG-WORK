import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Image, Row, Col } from 'antd';

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const selectedProduct = products.find((product) => product.id === id);
    setProduct(selectedProduct);
  }, [id]);

  const handleBuyNow = () => {
    navigate(`/user/dashboard/createOrder/${id}`);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{product.name}</h1>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Image src={product.image} alt={product.name} style={styles.image} />
        </Col>
        <Col span={12}>
          <p style={styles.price}>价格: ￥{product.price}</p>
          <p style={styles.stock}>库存: {product.stock}</p>
          <p style={styles.sales}>销量: {product.sales}</p>
          <Button type="primary" onClick={handleBuyNow} style={styles.button}>
            立即购买
          </Button>
          <Button style={styles.button}>加入购物车</Button>
        </Col>
      </Row>
      <div style={styles.imagesContainer}>
        <h2 style={styles.subTitle}>商品图片</h2>
        {product.imageList.map((img, index) => (
          <Image key={index} src={img} alt={`${product.name} ${index + 1}`} style={styles.productImage} />
        ))}
      </div>
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
  image: {
    width: '100%',
    borderRadius: '8px',
  },
  price: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  stock: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  sales: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  button: {
    display: 'block',
    width: '100%',
    marginBottom: '10px',
  },
  imagesContainer: {
    marginTop: '20px',
  },
  subTitle: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  productImage: {
    width: '100%',
    marginBottom: '10px',
  },
};
