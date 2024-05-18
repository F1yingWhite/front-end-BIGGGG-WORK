import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const { Search } = Input;

export function ProductControl() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [addProductVisible, setAddProductVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [mainImageFileList, setMainImageFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
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
    setFileList([]);
    setMainImageFileList([]);
    setAddProductVisible(true);
  };

  const editProduct = product => {
    setEditingProduct(product);
    setFileList(
      product.imageList.map((img, idx) => ({
        uid: idx,
        name: `image-${idx}.png`,
        status: 'done',
        url: process.env.PUBLIC_URL + img,
      }))
    );
    setMainImageFileList([{
      uid: '-1',
      name: 'main-image.png',
      status: 'done',
      url: process.env.PUBLIC_URL + product.image
    }]);
    form.setFieldsValue({
      ...product,
    });
    setAddProductVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const imageList = fileList.map(file => file.response?.url || file.url);
      const mainImage = mainImageFileList[0]?.response?.url || mainImageFileList[0]?.url;

      if (editingProduct) {
        const updatedProducts = products.map(product =>
          product.id === editingProduct.id ? { ...product, ...values, image: mainImage, imageList } : product
        );
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      } else {
        const newProduct = { ...values, id: uuidv4(), image: mainImage, imageList };
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

  const handleMainImageChange = ({ fileList: newFileList }) => {
    setMainImageFileList(newFileList.slice(-1)); // Only keep the latest file
  };

  const handleImageListChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async file => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const columns = [
    { title: '商品名称', dataIndex: 'name', key: 'name' },
    { title: '商品图片', dataIndex: 'image', key: 'image', render: text => <img src={process.env.PUBLIC_URL + text} alt="product" style={{ width: 50, minWidth: 20, minHeight: 20 }} /> },
    { title: '商品价格', dataIndex: 'price', key: 'price' },
    { title: '库存', dataIndex: 'stock', key: 'stock' },
    { title: '销量', dataIndex: 'sales', key: 'sales' },
    { title: '图片', dataIndex: 'imageList', key: 'imageList', render: images => images.map((img, idx) => <img key={idx} src={process.env.PUBLIC_URL + img} alt={`product-${idx}`} style={{ width: 50, margin: '0 5px', minWidth: 20, minHeight: 20 }} />) },
    { title: '商品编号', dataIndex: 'id', key: 'id' },
    { title: '所属店家', dataIndex: 'seller', key: 'seller' },
    { title: '操作', key: 'action', render: (_, record) => <Button onClick={() => editProduct(record)}>修改</Button> }
  ];

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
            <Upload
              action="/assets" // 替换为实际的上传地址
              listType="picture-card"
              fileList={mainImageFileList}
              onPreview={handlePreview}
              onChange={handleMainImageChange}
            >
              {mainImageFileList.length >= 1 ? null : uploadButton}
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
          <Form.Item name="imageList" label="图片列表">
            <Upload
              action="/assets" // 替换为实际的上传地址
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleImageListChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item name="seller" label="所属店家" rules={[{ required: true, message: '请输入所属店家!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

