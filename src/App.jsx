import React, { useState } from "react";
import college from "./assets/college.jpeg";
import {
  Form,
  Input,
  Select,
  Button,
  Tabs,
  Card,
  Typography,
  message,
  ConfigProvider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const departments = [
  "Electronics and Communication Engineering",
  "Electronics and Instrumentation Engineering",
  "Electricals and Electronics Engineering",
  "Production Engineering",
  "Computer Science and Engineering",
  "Civil Engineering - A",
  "Civil Engineering - B",
  "Mechanical Engineering - A",
  "Mechanical Engineering - B",
  "Information Technology",
  "Industrial Bio Technology - A",
  "Industrial Bio Technology - B",
];

const App = () => {
  const [joinVisible, setJoinVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentForm] = Form.useForm();
  const [alumniForm] = Form.useForm();

  const handleSubmit = async (type, values) => {
    try {
      setLoading(true);

      const BASE_URL = import.meta.env.VITE_API_URL;

      const endpoint =
        type === "Students"
          ? `${BASE_URL}/students`
          : `${BASE_URL}/alumni`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed");

      message.success(`${type.slice(0, -1)} Registered Successfully!`);

      if (type === "Students") {
        setJoinVisible(true);
        studentForm.resetFields();
      } else {
        alumniForm.resetFields();
      }
    } catch (error) {
      message.error("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const commonInputStyle = {
    height: 44,
    borderRadius: 10,
  };

  const studentFormUI = (
    <Form
      layout="vertical"
      form={studentForm}
      onFinish={(v) => handleSubmit("Students", v)}
    >
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input
          prefix={<UserOutlined />}
          placeholder="Full Name"
          style={commonInputStyle}
        />
      </Form.Item>

      <Form.Item name="dept" rules={[{ required: true }]}>
        <Select
          placeholder="Select Department"
          style={commonInputStyle}
          options={departments.map((d) => ({ label: d, value: d }))}
        />
      </Form.Item>

      <Input
        disabled
        value="Final Year"
        style={{ ...commonInputStyle, marginBottom: 18 }}
      />

      <Form.Item
        name="mobile"
        rules={[
          { required: true },
          { pattern: /^[6-9]\d{9}$/, message: "Enter valid mobile number" },
        ]}
      >
        <Input
          prefix={<PhoneOutlined />}
          placeholder="Mobile Number"
          style={commonInputStyle}
        />
      </Form.Item>

      <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
        <Input
          prefix={<MailOutlined />}
          placeholder="Email Address"
          style={commonInputStyle}
        />
      </Form.Item>

      <Form.Item name="address" rules={[{ required: true }]}>
        <Input.TextArea
          rows={3}
          placeholder="Address"
          style={{ borderRadius: 10 }}
        />
      </Form.Item>

      <Button
        htmlType="submit"
        type="primary"
        block
        loading={loading}
        style={{
          height: 44,
          borderRadius: 10,
          fontWeight: 500,
        }}
      >
        Submit
      </Button>

      {joinVisible && (
        <Button
          block
          style={{
            marginTop: 14,
            height: 44,
            borderRadius: 10,
          }}
          href="https://www.gctalumni.org.in/user/signup.dz"
          target="_blank"
        >
          Join Alumni Network
        </Button>
      )}
    </Form>
  );

  const alumniFormUI = (
    <Form
      layout="vertical"
      form={alumniForm}
      onFinish={(v) => handleSubmit("Alumni", v)}
    >
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input placeholder="Full Name" style={commonInputStyle} />
      </Form.Item>

      <Form.Item name="batch" rules={[{ required: true }]}>
        <Input
          placeholder="Batch (Eg: 2018 - 2022)"
          style={commonInputStyle}
        />
      </Form.Item>

      <Form.Item name="dept" rules={[{ required: true }]}>
        <Select
          placeholder="Select Department"
          style={commonInputStyle}
          options={departments.map((d) => ({ label: d, value: d }))}
        />
      </Form.Item>

      <Form.Item name="company" rules={[{ required: true }]}>
        <Input placeholder="Company / Organization" style={commonInputStyle} />
      </Form.Item>

      <Form.Item name="role" rules={[{ required: true }]}>
        <Input placeholder="Role / Designation" style={commonInputStyle} />
      </Form.Item>

      <Form.Item name="mobile" rules={[{ required: true }]}>
        <Input placeholder="Mobile Number" style={commonInputStyle} />
      </Form.Item>

      <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
        <Input placeholder="Email Address" style={commonInputStyle} />
      </Form.Item>

      <Button
        htmlType="submit"
        type="primary"
        block
        loading={loading}
        style={{
          height: 44,
          borderRadius: 10,
          fontWeight: 500,
        }}
      >
        Submit
      </Button>
    </Form>
  );

  return (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#7c3aed",
        borderRadius: 12,
      },
    }}
  >
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${college})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position:"relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
        }}
      />

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: 520,
          padding: 20,
          zIndex: 1,
        }}
      >
        <Card
          bordered={false}
          style={{
            borderRadius: 20,
            backdropFilter: "blur(15px)",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 25 }}>
            <Title level={3} style={{ marginBottom: 5 }}>
              GSARC Registration Portal
            </Title>
            <Text type="secondary">
              Connect • Collaborate • Grow Together
            </Text>
          </div>

          <Tabs
            centered
            size="large"
            items={[
              { key: "1", label: "🎓 Student", children: studentFormUI },
              { key: "2", label: "👨‍🎓 Alumni", children: alumniFormUI },
            ]}
          />
        </Card>
      </motion.div>
    </div>
  </ConfigProvider>
);
};

export default App;