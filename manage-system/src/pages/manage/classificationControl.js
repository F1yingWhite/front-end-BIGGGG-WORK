import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function ClassificationControl() {
  const [classifications, setClassifications] = useState([]);
  const [filteredClassifications, setFilteredClassifications] = useState([]);
  const [addClassificationVisible, setAddClassificationVisible] = useState(false);
  const [editingClassification, setEditingClassification] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClassifications();
  }, [navigate]);

  const fetchClassifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classifications');
      setClassifications(response.data);
      setFilteredClassifications(response.data);
    } catch (error) {
      message.error('获取分类数据失败');
      console.error('获取分类数据失败:', error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = classifications.filter(classification => classification.name.toLowerCase().includes(value));
    setFilteredClassifications(filtered);
  };

  const addClassification = () => {
    setEditingClassification(null);
    setAddClassificationVisible(true);
    form.resetFields();
  };

  const editClassification = (classification) => {
    setEditingClassification(classification);
    setAddClassificationVisible(true);
    form.setFieldsValue(classification);
  };

  const deleteClassification = async (name) => {
    try {
      await axios.delete(`http://localhost:5000/api/classifications/${name}`);
      const updatedClassifications = classifications.filter(classification => classification.name !== name);
      setClassifications(updatedClassifications);
      setFilteredClassifications(updatedClassifications);
      message.success('删除分类成功');
    } catch (error) {
      message.error('删除分类失败');
      console.error('删除分类失败:', error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      let updatedClassifications;
      if (editingClassification) {
        await axios.put(`http://localhost:5000/api/classifications/${editingClassification.name}`, values);
        updatedClassifications = classifications.map(classification => classification.name === editingClassification.name ? values : classification);
      } else {
        await axios.post('http://localhost:5000/api/classifications', values);
        updatedClassifications = [...classifications, values];
      }
      setClassifications(updatedClassifications);
      setFilteredClassifications(updatedClassifications);
      setAddClassificationVisible(false);
      message.success(editingClassification ? '修改分类成功' : '添加分类成功');
    } catch (error) {
      message.error('操作分类失败');
      console.error('操作分类失败:', error);
    }
  };

  const handleCancel = () => {
    setAddClassificationVisible(false);
  };

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => editClassification(record)}>修改</Button>
          <Button onClick={() => deleteClassification(record.name)} style={{ marginLeft: 8 }} danger>删除</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input.Search
          placeholder="根据分类名搜索"
          onChange={handleSearch}
          style={{ width: '25%' }}
        />
        <Button type="primary" onClick={addClassification}>添加分类</Button>
      </div>
      <Table dataSource={filteredClassifications} columns={columns} rowKey="name" pagination={{ pageSize: 7 }} />
      <Modal title={editingClassification ? '编辑分类' : '添加分类'} open={addClassificationVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="classificationForm">
          <Form.Item name="name" label="分类名称" rules={[{ required: true, message: '请输入分类名称!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
