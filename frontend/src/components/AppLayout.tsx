import { Layout as AntLayout, Menu, Avatar, Typography, Button } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Link, useLocation, Outlet } from "react-router-dom";
import type { MenuProps } from "antd";

const { Header, Sider, Content, Footer } = AntLayout;
const { Title } = Typography;

export default function AppLayout() {
  const location = useLocation();

  const menuItems: MenuProps["items"] = [
    {
      key: "/",
      icon: <UnorderedListOutlined />,
      label: <Link to="/">Customer List</Link>,
    },
    {
      key: "/coming-soon-1",
      icon: <ClockCircleOutlined />,
      label: <span>Coming Soon</span>,
    },
    {
      key: "/coming-soon-2",
      icon: <ClockCircleOutlined />,
      label: <span>Coming Soon</span>,
    },
    {
      key: "/coming-soon-3",
      icon: <ClockCircleOutlined />,
      label: <span>Coming Soon</span>,
    },
    {
      key: "/coming-soon-4",
      icon: <ClockCircleOutlined />,
      label: <span>Coming Soon</span>,
    },
  ];

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ backgroundColor: "#001529" }}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: "16px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          <Link to="/" style={{ color: "white" }}>SaluberMD</Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>

      <AntLayout>
        <Header
          style={{
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px",
            boxShadow: "0 2px 8px #f0f1f2",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Customer Management System
          </Title>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span>Admin</span>
            <Avatar icon={<UserOutlined />} />
            <Button
              type="primary"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Logout
            </Button>
          </div>
        </Header>

        <Content style={{ margin: "24px", padding: 24, background: "#fff" }}>
          <Outlet /> {/* ✅ This renders child routes */}
        </Content>

        <Footer style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}>
          © 2025 <b>SaluberMD</b> — All rights reserved. <br />
          Done by{" "}
          <a
            href="https://matmood.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: "bold" }}
          >
            Mahmood AlTurabi
          </a>
        </Footer>
      </AntLayout>
    </AntLayout>
  );
}
