import React, { useState, useEffect } from 'react';
import { Input, Carousel, Card, Row, Col } from 'antd';
import { ScanOutlined, HeartOutlined, FallOutlined, BulbOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const carouselImages = [
  'https://via.placeholder.com/800x300?text=Image+1',
  'https://via.placeholder.com/800x300?text=Image+2',
  'https://via.placeholder.com/800x300?text=Image+3',
  'https://via.placeholder.com/800x300?text=Image+4',
];

const categories = [
  { icon: <BulbOutlined style={{ fontSize: '32px' }} />, label: '专题' },
  { icon: <ScanOutlined style={{ fontSize: '32px' }} />, label: '活动' },
  { icon: <HeartOutlined style={{ fontSize: '32px' }} />, label: '优选' },
  { icon: <FallOutlined style={{ fontSize: '32px' }} />, label: '特惠' },
];

const brands = [
  { name: '小米', image: 'https://via.placeholder.com/100', products: 100 },
  { name: '华为', image: 'https://via.placeholder.com/100', products: 100 },
];

export function MainPage() {
  const [hotProducts, setHotProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setHotProducts(storedProducts);
  }, []);

  const handleCardClick = (id) => {
    navigate(`/user/dashboard/product/${id}`);
  };

  return (
    <div style={{ padding: '0px' }}>
      <div style={{ backgroundColor: "rgb(204, 85, 61)", padding: '20px' }}>
        <Search
          placeholder="搜索商品"
          enterButton="搜索"
          size="large"
          onSearch={value => console.log(value)}
          style={{ marginBottom: '20px' }}
          addonBefore={<ScanOutlined />}
        />
        <Carousel autoplay>
          {carouselImages.map((src, index) => (
            <div key={index}>
              <img src={src} alt={`carousel-${index}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            </div>
          ))}
        </Carousel>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          {categories.map((category, index) => (
            <div key={index} style={{ textAlign: 'center', color: 'white' }}>
              {category.icon}
              <div>{category.label}</div>
            </div>
          ))}
        </div>
      </div>

      <h2 style={{ marginTop: '20px', paddingLeft: '10px' }}>品牌制造商直供</h2>
      <Row gutter={[16, 16]} style={{ margin: '10px' }}>
        {brands.map((brand, index) => (
          <Col key={index} span={12} style={{ textAlign: 'center' }}>
            <img src={brand.image} alt={brand.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <div>{brand.name}</div>
            <div>商品数量：{brand.products}</div>
          </Col>
        ))}
      </Row>

      <h2 style={{ marginTop: '20px', paddingLeft: '10px' }}>热门商品</h2>
      <Row gutter={[16, 16]} style={{ margin: '10px' }}>
        {hotProducts.map((product, index) => (
          <Col key={index} span={12}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.image} />}
              onClick={() => handleCardClick(product.id)}
            >
              <Card.Meta title={product.name} description={product.price + '￥'} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
