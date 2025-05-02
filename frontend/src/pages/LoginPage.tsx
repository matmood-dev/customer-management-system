import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message, Card } from "antd";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === "saluber_admin_token") {
      navigate("/");
    }
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/login", values);
      localStorage.setItem("token", res.data.token);
      message.success("Login successful");
      navigate("/");
    } catch {
      message.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "64px auto" }}>
      <Title level={3}>Admin Login</Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        username: <b>admin</b> &nbsp;&nbsp;&nbsp; password: <b>123</b>
      </Text>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
