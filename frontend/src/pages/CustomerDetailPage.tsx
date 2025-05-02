import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  message,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  Space,
  Spin,
  Popconfirm,
} from "antd";

const { Title } = Typography;

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    axios
      .get(`${API_BASE}/customers/${id}`)
      .then((res) => {
        setCustomer(res.data);
        form.setFieldsValue(res.data);
        setLoading(false);
      })
      .catch(() => {
        message.error("Failed to fetch customer");
        setLoading(false);
      });
  }, [id]);

  const handleSave = async (values: Customer) => {
    try {
      await axios.put(`${API_BASE}/customers/${id}`, values);
      message.success(`✅ "${values.name}" was updated successfully.`);
      setCustomer(values);
      setEditing(false);
    } catch {
      message.error("Update failed.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/customers/${id}`);
      message.success("Customer deleted.");
      navigate("/");
    } catch {
      message.error("Delete failed.");
    }
  };

  if (loading || !customer)
    return <Spin size="large" style={{ display: "block", margin: "40px auto" }} />;

  return (
    <Card style={{ maxWidth: 600, margin: "0 auto" }}>
      <Title level={3}>Customer Details</Title>

      {!editing ? (
        <>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{customer.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{customer.phone}</Descriptions.Item>
          </Descriptions>

          <Space style={{ marginTop: 24 }}>
            <Button type="primary" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this customer?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Button onClick={() => navigate("/")}>Back</Button>
          </Space>
        </>
      ) : (
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                setEditing(false);
              }}
            >
              Cancel
            </Button>
          </Space>
        </Form>
      )}
    </Card>
  );
}
