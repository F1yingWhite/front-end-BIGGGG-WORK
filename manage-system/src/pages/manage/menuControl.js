import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function MenuControl() {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [addMenuVisible, setAddMenuVisible] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenus();
  }, [navigate]);

  const fetchMenus = async () => {
    try {
      const response = await axios.get('http://localhost:6000/api/menus');
      setMenus(response.data);
      setFilteredMenus(response.data);
    } catch (error) {
      message.error('获取菜单数据失败');
      console.error('获取菜单数据失败:', error);
    }
  };

  const pathValid = () => ({
    validator(_, value) {
      if (value && !value.startsWith('/')) {
        return Promise.reject(new Error('路径应该以/开头!'));
      }
      return Promise.resolve();
    },
  });

  const columns = [
    {
      title: '目录',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '父组件',
      dataIndex: 'parent',
      key: 'parent',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '操作',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => editMenu(record)}>Edit</Button>
          <Button onClick={() => deleteMenu(record.title)} style={{ marginLeft: 8 }} danger>Delete</Button>
        </span>
      ),
    },
  ];

  const addMenu = () => {
    setEditingMenu(null);
    setAddMenuVisible(true);
    form.resetFields();
  };

  const editMenu = (menu) => {
    setEditingMenu(menu);
    setAddMenuVisible(true);
    form.setFieldsValue(menu);
  };

  const deleteMenu = async (title) => {
    try {
      const menuToDelete = menus.find(menu => menu.title === title);
      if (menuToDelete && menuToDelete.parent === "") {
        const childMenus = menus.filter(childMenu => childMenu.parent === title);
        if (childMenus.length > 0) {
          message.error('请先删除子菜单', 3);
          return;
        }
      }
      await axios.delete(`http://localhost:6000/api/menus/${title}`);
      const updatedMenus = menus.filter(menu => menu.title !== title);
      setMenus(updatedMenus);
      setFilteredMenus(updatedMenus);
    } catch (error) {
      message.error('删除菜单失败');
      console.error('删除菜单失败:', error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!values.parent) {
        values.parent = '';
      }
      let updatedMenus;
      if (editingMenu) {
        await axios.put(`http://localhost:6000/api/menus/${editingMenu.title}`, values);
        updatedMenus = menus.map(menu => menu.title === editingMenu.title ? values : menu);
      } else {
        await axios.post('http://localhost:6000/api/menus', values);
        updatedMenus = [...menus, values];
      }
      setMenus(updatedMenus);
      setFilteredMenus(updatedMenus);
      setAddMenuVisible(false);
    } catch (error) {
      message.error('保存菜单失败');
      console.error('保存菜单失败:', error);
    }
  };

  const handleCancel = () => {
    setAddMenuVisible(false);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = menus.filter(menu => menu.title.toLowerCase().includes(searchValue));
    setFilteredMenus(filteredData);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input.Search
          placeholder="按照标题搜索"
          onChange={handleSearch}
          style={{ width: '25%' }}
        />
        <Button type="primary" onClick={addMenu}>Add Menu</Button>
      </div>
      <Table dataSource={filteredMenus} columns={columns} rowKey="title" pagination={{ pageSize: 7 }} />
      <Modal title={editingMenu ? 'Edit Menu' : 'Add Menu'} open={addMenuVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="menuForm">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: '请输入标题!' }]}>
            {editingMenu ? <Input disabled /> : <Input />}
          </Form.Item>
          <Form.Item name="parent" label="Parent">
            <Select disabled={editingMenu && !form.getFieldValue('parent')}>
              <Select.Option key="root" value="">None</Select.Option>
              {menus.map(menu => {
                if (!menu.parent) {
                  return (
                    <Select.Option key={menu.title} value={menu.title} disabled={editingMenu && menu.title === ''}>
                      {menu.title}
                    </Select.Option>
                  );
                }
                return null;
              })}
            </Select>
          </Form.Item>
          <Form.Item name="path" label="Path" rules={[pathValid]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
