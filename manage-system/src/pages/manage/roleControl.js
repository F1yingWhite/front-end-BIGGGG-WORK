import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Tree, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isAuthorize } from '../../utils/authorize';

export function RoleControl() {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [addRoleVisible, setAddRoleVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [privilegeVisible, setPrivilegeVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      setRoles(response.data);
      setFilteredRoles(response.data);
    } catch (error) {
      message.error('获取角色数据失败');
    }
  };

  const fetchMenus = async () => {
    try {
      const response = await axios.get('/api/roles/menus');
      setMenus(transformToTreeData(response.data));
    } catch (error) {
      message.error('获取菜单数据失败');
    }
  };
  useEffect(() => {
    if (!isAuthorize("角色管理")) {
      navigate('/manage/dashboard');
    }
    fetchRoles();
    fetchMenus();
  }, [navigate]);



  const columns = [
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => editRole(record)}>Edit</Button>
          <Button onClick={() => deleteRole(record.role)} style={{ marginLeft: 8 }} danger>Delete</Button>
          <Button onClick={() => managePrivilege(record)} style={{ marginLeft: 8 }}>Privilege</Button>
        </span>
      ),
    },
  ];

  const transformToTreeData = (menuList) => {
    const treeData = [];
    const map = {};

    menuList.forEach(menu => {
      const { title, path, parent } = menu;
      const key = path || title;

      if (!map[key]) {
        map[key] = { title, key, children: [], allowUser: menu.allowUser };
      }

      if (parent) {
        const parentKey = parent;
        if (!map[parentKey]) {
          map[parentKey] = { title: parent, key: parentKey, children: [] };
        }
        map[parentKey].children.push(map[key]);
      } else {
        treeData.push(map[key]);
      }
    });

    return treeData;
  };

  const addRole = () => {
    setEditingRole(null);
    setAddRoleVisible(true);
    form.resetFields();
  };

  const editRole = (role) => {
    setEditingRole(role);
    setAddRoleVisible(true);
    form.setFieldsValue(role);
  };

  const deleteRole = async (roleName) => {
    try {
      await axios.delete(`/api/roles/${roleName}`);
      const updatedRoles = roles.filter(role => role.role !== roleName);
      setRoles(updatedRoles);
      setFilteredRoles(updatedRoles);
      message.success('角色删除成功');
    } catch (error) {
      message.error('删除角色失败');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      let updatedRoles;
      if (editingRole) {
        await axios.put(`/api/roles/${editingRole.role}`, values);
        updatedRoles = roles.map(role => role.role === editingRole.role ? values : role);
      } else {
        await axios.post('/api/roles', values);
        updatedRoles = [...roles, values];
      }
      setRoles(updatedRoles);
      setFilteredRoles(updatedRoles);
      setAddRoleVisible(false);
      message.success(editingRole ? '角色更新成功' : '角色添加成功');
    } catch (error) {
      message.error(editingRole ? '更新角色失败' : '添加角色失败');
    }
  };

  const handleCancel = () => {
    setAddRoleVisible(false);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = roles.filter(role => role.role.toLowerCase().includes(searchValue));
    setFilteredRoles(filteredData);
  };

  const managePrivilege = (role) => {
    setEditingRole(role);
    const storedMenus = JSON.parse(localStorage.getItem("menus")) || [];
    const roleMenus = storedMenus
      .filter(menu => menu.allowUser && menu.allowUser.includes(role.role))
      .map(menu => menu.path || menu.title);
    setSelectedKeys(roleMenus);
    setPrivilegeVisible(true);
  };

  const handlePrivilegeOk = async () => {
    try {
      const storedMenus = JSON.parse(localStorage.getItem("menus"));
      const updatedMenus = storedMenus.map(menu => {
        if (selectedKeys.includes(menu.path || menu.title)) {
          return { ...menu, allowUser: [...new Set([...(menu.allowUser || []), editingRole.role])] };
        } else {
          return { ...menu, allowUser: (menu.allowUser || []).filter(user => user !== editingRole.role) };
        }
      });
      await axios.put('/api/roles/menus', updatedMenus);
      localStorage.setItem("menus", JSON.stringify(updatedMenus));
      setPrivilegeVisible(false);
      message.success('权限更新成功');
    } catch (error) {
      message.error('更新权限失败');
    }
  };

  const handlePrivilegeCancel = () => {
    setPrivilegeVisible(false);
  };

  const onCheck = (checkedKeys) => {
    setSelectedKeys(checkedKeys);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input.Search
          placeholder="根据角色搜索"
          onChange={handleSearch}
          style={{ width: '25%' }}
        />
        <Button type="primary" onClick={addRole}>Add Role</Button>
      </div>
      <Table dataSource={filteredRoles} columns={columns} rowKey="role" pagination={{ pageSize: 7 }} />
      {/* 用户管理 */}
      <Modal title={editingRole ? 'Edit Role' : 'Add Role'} open={addRoleVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="roleForm">
          <Form.Item name="role" label="Role" rules={[{ required: true, message: '请输入角色名!' }]}>
            {editingRole ? <Input disabled /> : <Input />}
          </Form.Item>
          <Form.Item name="desc" label="Description" rules={[{ required: true, message: '请输入描述!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* 权限管理 */}
      <Modal title="Manage Privileges" open={privilegeVisible} onOk={handlePrivilegeOk} onCancel={handlePrivilegeCancel}>
        <Tree
          checkable
          onCheck={onCheck}
          checkedKeys={selectedKeys}
          treeData={menus}
        />
      </Modal>
    </div>
  );
}
