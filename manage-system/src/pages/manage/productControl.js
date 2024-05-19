import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, Upload, Image, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { isAuthorize } from '../../utils/authorize';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export function ProductControl() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [addProductVisible, setAddProductVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [mainImageFileList, setMainImageFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [sellers, setSellers] = useState([]);
  const [form] = Form.useForm();

  const privilege = localStorage.getItem("privilege");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorize("商品列表")) {
      navigate('/manage/dashboard');
    }
    fetchProducts();
    fetchSellers();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      const productsData = response.data;
      const filtered = privilege === '管理员' ? productsData : productsData.filter(product => product.seller === username);
      setProducts(filtered);
      setFilteredProducts(filtered);
    } catch (error) {
      message.error('获取商品数据失败');
    }
  };

  const fetchSellers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/sellers');
      setSellers(response.data);
    } catch (error) {
      message.error('获取商家数据失败');
    }
  };

  const handleSearch = e => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
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
        url: `http://localhost:5000${img}`, // 修正URL路径
      }))
    );
    setMainImageFileList([{
      uid: '-1',
      name: 'main-image.png',
      status: 'done',
      url: `http://localhost:5000${product.image}` // 修正URL路径
    }]);
    form.setFieldsValue({
      ...product,
    });
    setAddProductVisible(true);
  };

  const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const imageList = await Promise.all(
        fileList.map(async (file) => file.url || await getBase64(file.originFileObj))
      );
      const mainImage = mainImageFileList[0]?.url || await getBase64(mainImageFileList[0].originFileObj);

      let updatedProducts;
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, { ...values, image: mainImage, imageList });
        updatedProducts = products.map(product =>
          product.id === editingProduct.id ? { ...product, ...values, image: mainImage, imageList } : product
        );
      } else {
        const newProduct = { ...values, id: generateId(), image: mainImage, imageList, seller: privilege === '管理员' ? values.seller : username };
        await axios.post('http://localhost:5000/api/products', newProduct);
        updatedProducts = [...products, newProduct];
      }

      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setSearchValue('');
      setAddProductVisible(false);
      form.resetFields();
      message.success(editingProduct ? '修改商品成功' : '添加商品成功');
    } catch (error) {
      message.error('操作商品失败');
    }
  };

  const handleCancel = () => {
    setAddProductVisible(false);
    form.resetFields();
  };

  const handleMainImageChange = ({ fileList: newFileList }) => {
    setMainImageFileList(newFileList.slice(-1));
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
    { title: '商品图片', dataIndex: 'image', key: 'image', render: text => <img src={`http://localhost:5000${text}`} alt="product" style={{ width: 50, minWidth: 20, minHeight: 20 }} /> },
    { title: '商品价格', dataIndex: 'price', key: 'price' },
    { title: '库存', dataIndex: 'stock', key: 'stock' },
    { title: '销量', dataIndex: 'sales', key: 'sales' },
    { title: '分类', dataIndex: 'classification', key: 'classification' },
    { title: '图片', dataIndex: 'imageList', key: 'imageList', render: images => images.map((img, idx) => <img key={idx} src={`http://localhost:5000${img}`} alt={`product-${idx}`} style={{ width: 50, margin: '0 5px', minWidth: 20, minHeight: 20 }} />) },
    { title: '商品编号', dataIndex: 'id', key: 'id' },
    { title: '所属店家', dataIndex: 'seller', key: 'seller', render: text => privilege === '管理员' ? text : null },
    { title: '操作', key: 'action', render: (_, record) => <Button onClick={() => editProduct(record)}>修改</Button> }
  ].filter(column => !(column.dataIndex === 'seller' && privilege !== '管理员'));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Search
          placeholder="根据商品名称搜索"
          value={searchValue}
          onChange={handleSearch}
          style={{ width: '25%' }}
        />
        <Button type="primary" onClick={addProduct}>添加商品</Button>
      </div>
      <Table dataSource={filteredProducts} columns={columns} rowKey="id" pagination={{ pageSize: 7 }} />
      <Modal title={editingProduct ? '编辑商品' : '添加商品'} open={addProductVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="productForm">
          <Form.Item name="name" label="商品名称" rules={[{ required: true, message: '请输入商品名称!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="classification" label="分类" rules={[{ required: true, message: '请输入商品分类!' }]}>
            <Select>
              {filteredProducts.map((classification) => (
                <Option key={classification.id} value={classification.name}>
                  {classification.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="image" label="商品图片" rules={[{ required: true, message: '请上传商品图片!' }]}>
            <Upload
              action="http://localhost:5000/api/upload" // 指定上传路径
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
              action="http://localhost:5000/api/upload" // 指定上传路径
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleImageListChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          {privilege === '管理员' && (
            <Form.Item name="seller" label="所属店家" rules={[{ required: true, message: '请输入所属店家!' }]}>
              <Select>
                {sellers.map(seller => (
                  <Option key={seller} value={seller}>{seller}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
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
}
