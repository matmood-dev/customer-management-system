import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Input,
  Form,
  Typography,
  message,
  Space,
  Popconfirm,
  Drawer,
  Row,
  Col,
} from "antd";

const { Title } = Typography;
const { Search } = Input;

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function CustomerListPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/customers`);
      setCustomers(res.data);
      setFilteredCustomers(res.data);
    } catch (error) {
      message.error("Failed to fetch customers.");
    }
  };

  const handleAddOrEdit = async (values: any) => {
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/customers/${editingId}`, values);
        message.success(`✅ "${values.name}" was updated successfully.`);
      } else {
        await axios.post(`${API_BASE}/customers`, values);
        message.success(`🎉 New customer "${values.name}" added.`);
      }
      form.resetFields();
      setEditingId(null);
      setDrawerOpen(false);
      fetchCustomers();
    } catch (error) {
      message.error("Failed to save customer.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/customers/${id}`);
      fetchCustomers();
      message.success("Customer deleted.");
    } catch (error) {
      message.error("Failed to delete customer.");
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.id);
    form.setFieldsValue(customer);
    setDrawerOpen(true);
  };

  const handleSearch = (value: string) => {
    const lower = value.toLowerCase();
    const filtered = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.email.toLowerCase().includes(lower) ||
        c.phone.includes(lower)
    );
    setFilteredCustomers(filtered);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_: any, record: Customer) => (
        <Link to={`/customer/${record.id}`}>{record.name}</Link>
      ),
    },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Action",
      render: (_: any, record: Customer) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this customer?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Title level={3}>Customer Management</Title>

      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col xs={24} sm={16}>
          <Search
            placeholder="Search by name, email, or phone"
            allowClear
            onSearch={handleSearch}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={8}>
          <Button
            type="primary"
            block
            onClick={() => {
              setDrawerOpen(true);
              form.resetFields();
              setEditingId(null);
            }}
          >
            Add Customer
          </Button>
        </Col>
      </Row>

      <div style={{ marginTop: 16 }}>
        <Table
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          bordered
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      </div>

      <Drawer
        title={editingId ? "Edit Customer" : "Add Customer"}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          form.resetFields();
          setEditingId(null);
        }}
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrEdit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingId ? "Update" : "Add"} Customer
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
