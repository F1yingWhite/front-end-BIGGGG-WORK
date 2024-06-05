import React, { useState, useEffect, useContext } from 'react';
import { Input, Carousel, Card, Row, Col, Pagination } from 'antd';
import { ScanOutlined, HeartOutlined, FallOutlined, BulbOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../App';
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
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const storage = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const storedProducts = await storage.getItem('products').then(products => products.value);
        setHotProducts(storedProducts);
        setAllProducts(storedProducts);
      } catch (error) {
        setAllProducts([])
        setHotProducts([]);
      }
    };

    if (storage) {
      fetchProducts();
    }
  }, [storage]);

  const handleCardClick = (id) => {
    navigate(`/user/dashboard/product/${id}`);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = hotProducts.slice(startIndex, startIndex + pageSize);

  const handleSearch = (value) => {
    const filteredProducts = allProducts.filter(product => product.name.includes(value));
    setHotProducts(filteredProducts);
  }

  return (
    <div style={{ padding: '0px' }}>
      <div style={{ backgroundColor: "rgb(204, 85, 61)", padding: '20px' }}>
        <Search
          placeholder="搜索商品"
          enterButton="搜索"
          size="large"
          onSearch={handleSearch}
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
        {currentProducts.map((product, index) => (
          <Col key={index} span={12}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.imageList[0]} />}
              onClick={() => handleCardClick(product.id)}
            >
              <Card.Meta title={product.name} description={product.price + '￥'} />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={hotProducts.length}
        onChange={handlePageChange}
        style={{ textAlign: 'center', marginTop: '20px', marginBottom: '40px' }}
      />
    </div>
  );
}
