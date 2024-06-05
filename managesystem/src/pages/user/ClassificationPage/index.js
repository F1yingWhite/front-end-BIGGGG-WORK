import React, { useState, useEffect } from 'react';
import { List, Row, Col, Card, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import './ClassificationPage.css';

export function ClassificationPage() {
  const [classifications, setClassifications] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const navigate = useNavigate();

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    setAllProducts(products);
  }, []);

  useEffect(() => {
    const storedClassifications = JSON.parse(localStorage.getItem('classifications')) || [];
    setClassifications(storedClassifications);
    if (storedClassifications.length > 0) {
      setSelectedCategory(storedClassifications[0].name);
      setSubcategories(storedClassifications[0].subcategories || []);
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setSubcategories(category.subcategories || []);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  const handleCardClick = (id) => {
    navigate(`/user/dashboard/product/${id}`);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const filteredProducts = allProducts.filter(product => product.classification === selectedCategory);
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  return (
    <div className="classification-page">
      <Row>
        <Col span={6} className="category-list">
          <List
            bordered
            dataSource={classifications}
            renderItem={item => (
              <List.Item
                onClick={() => handleCategoryClick(item)}
                className={item.name === selectedCategory ? 'selected' : ''}
              >
                {item.name}
              </List.Item>
            )}
          />
        </Col>
        <Col span={18} className="subcategory-list">
          <h2>{selectedCategory}</h2>
          <Row gutter={[16, 16]}>
            {currentProducts.map((product, index) => (
              <Col key={index} span={12} style={{ marginTop: '20px' }}>
                <Card
                  hoverable
                  cover={<img alt={product.name} src={product.imageList[0]} />}
                  onClick={() => handleCardClick(product.id)}
                >
                  <Card.Meta title={product.name} description={product.price + '￥'} />
                  <Card.Meta description={'库存' + product.stock + '件'} />
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredProducts.length}
            onChange={handlePageChange}
            style={{ textAlign: 'center', marginTop: '20px', marginBottom: '40px' }}
            hideOnSinglePage={true}
          />
        </Col>
      </Row>
    </div>
  );
}
