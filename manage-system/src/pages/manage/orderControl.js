import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const { Search } = Input;

export function OrderControl() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [addProductVisible, setAddProductVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
    setFilteredProducts(storedProducts);
  }, []);

  const handleSearch = e => {
    const value = e.target.value.toLowerCase();
    const filtered = products.filter(product => product.name.toLowerCase().includes(value));
    setFilteredProducts(filtered);
  };

  const addProduct = () => {
    setEditingProduct(null);
    setAddProductVisible(true);
  };

  const editProduct = product => {
    setEditingProduct(product);
    form.setFieldsValue({
      ...product,
      imageList: product.imageList.map((img, idx) => ({
        uid: idx,
        name: `image-${idx}.png`,
        status: 'done',
        url: process.env.PUBLIC_URL + img,
      }))
    });
    setAddProductVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const image = values.image[0]?.response?.url || values.image[0]?.url;
      const imageList = values.imageList.map(file => file.response?.url || file.url);

      if (editingProduct) {
        const updatedProducts = products.map(product =>
          product.id === editingProduct.id ? { ...product, ...values, image, imageList } : product
        );
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      } else {
        const newProduct = { ...values, id: uuidv4(), image, imageList };
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      }
      setAddProductVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setAddProductVisible(false);
    form.resetFields();
  };

  const columns = [
    { title: '商品名称', dataIndex: 'name', key: 'name' },
    { title: '商品图片', dataIndex: 'image', key: 'image', render: text => <img src={process.env.PUBLIC_URL + text} alt="product" style={{ width: 50, minWidth: 100, minHeight: 100 }} /> },
    { title: '商品价格', dataIndex: 'price', key: 'price' },
    { title: '库存', dataIndex: 'stock', key: 'stock' },
    { title: '销量', dataIndex: 'sales', key: 'sales' },
    { title: '图片', dataIndex: 'imageList', key: 'imageList', render: images => images.map((img, idx) => <img key={idx} src={process.env.PUBLIC_URL + img} alt={`product-${idx}`} style={{ width: 50, margin: '0 5px', minWidth: 100, minHeight: 100 }} />) },
    { title: '商品编号', dataIndex: 'id', key: 'id' },
    { title: '所属店家', dataIndex: 'seller', key: 'seller' },
    { title: '操作', key: 'action', render: (_, record) => <Button onClick={() => editProduct(record)}>修改</Button> }
  ];

  const uploadProps = {
    name: 'file',
    action: '/upload', // 这里需要设置你的图片上传接口
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Search
          placeholder="根据商品名称搜索"
          onChange={handleSearch}
          style={{ width: '25%' }}
        />
        <Button type="primary" onClick={addProduct}>Add Product</Button>
      </div>
      <Table dataSource={filteredProducts} columns={columns} rowKey="id" pagination={{ pageSize: 7 }} />
      <Modal title={editingProduct ? 'Edit Product' : 'Add Product'} open={addProductVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="productForm">
          <Form.Item name="name" label="商品名称" rules={[{ required: true, message: '请输入商品名称!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="商品图片" rules={[{ required: true, message: '请上传商品图片!' }]}>
            <Upload {...uploadProps} listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="price" label="商品价格" rules={[{ required: true, message: '请输入商品价格!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="stock" label="库存" rules={[{ required: true, message: '请输入库存数量!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="sales" label="销量" rules={[{ required: true, message: '请输入销量数量!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="imageList" label="图片列表" rules={[{ required: true, message: '请上传图片列表!' }]}>
            <Upload {...uploadProps} listType="picture" multiple>
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="seller" label="所属店家" rules={[{ required: true, message: '请输入所属店家!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

