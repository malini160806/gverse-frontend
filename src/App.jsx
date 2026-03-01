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
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import "./App.css";

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed");
    }

    message.success(`${type.slice(0, -1)} Registered Successfully!`);

    if (type === "Students") {
      setJoinVisible(true);
      studentForm.resetFields();
    } else {
      alumniForm.resetFields();
    }
  } catch (error) {
    console.error(error);
    message.error("Submission failed.");
  } finally {
    setLoading(false);
  }
};

  const studentFormUI = (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Form
        layout="vertical"
        form={studentForm}
        onFinish={(v) => handleSubmit("Students", v)}
      >
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input prefix={<UserOutlined />} placeholder="Full Name" />
        </Form.Item>

        <Form.Item name="dept" rules={[{ required: true }]}>
          <Select
            placeholder="Select Department"
            options={departments.map((d) => ({
              label: d,
              value: d,
            }))}
          />
        </Form.Item>

        <Input disabled value="Final Year" className="static-field" />

        <Form.Item
          name="mobile"
          rules={[
            { required: true },
            { pattern: /^[6-9]\d{9}$/, message: "Enter valid mobile number" },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Mobile Number" />
        </Form.Item>

        <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
          <Input prefix={<MailOutlined />} placeholder="Email Address" />
        </Form.Item>

        <Form.Item name="address" rules={[{ required: true }]}>
          <Input.TextArea rows={3} placeholder="Address" />
        </Form.Item>

        <Button
          htmlType="submit"
          block
          loading={loading}
          className="primary-btn"
        >
          Submit
        </Button>

        {joinVisible && (
          <Button
            block
            className="secondary-btn"
            href="https://www.gctalumni.org.in/user/signup.dz"
            target="_blank"
          >
            Join Alumni Network
          </Button>
        )}
      </Form>
    </motion.div>
  );

  const alumniFormUI = (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Form
        layout="vertical"
        form={alumniForm}
        onFinish={(v) => handleSubmit("Alumni", v)}
      >
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item name="batch" rules={[{ required: true }]}>
          <Input placeholder="Batch (Eg: 2018 - 2022)" />
        </Form.Item>

        <Form.Item name="dept" rules={[{ required: true }]}>
          <Select
            placeholder="Select Department"
            options={departments.map((d) => ({
              label: d,
              value: d,
            }))}
          />
        </Form.Item>

        <Form.Item name="company" rules={[{ required: true }]}>
          <Input placeholder="Company / Organization" />
        </Form.Item>

        <Form.Item name="role" rules={[{ required: true }]}>
          <Input placeholder="Role / Designation" />
        </Form.Item>

        <Form.Item name="mobile" rules={[{ required: true }]}>
          <Input placeholder="Mobile Number" />
        </Form.Item>

        <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Email Address" />
        </Form.Item>

        <Button
          htmlType="submit"
          block
          loading={loading}
          className="primary-btn"
        >
          Submit
        </Button>
      </Form>
    </motion.div>
  );

  return (
  <div 
    className="app-wrapper" 
    style={{
      backgroundImage: `url(${college})`,
    }}>
    <div className="background-overlay"></div>
    <div className="background-glow"></div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card-container"
    >
      <Card bordered={false} className="premium-card">
        <div className="header-section">
          <Title level={2} className="portal-title">
            GSARC Registration
          </Title>
          <Text className="portal-subtitle">
            Empowering Connections Between Students & Alumni
          </Text>
        </div>

        <Tabs
          centered
          animated
          className="custom-tabs"
          items={[
            { key: "1", label: "Student", children: studentFormUI },
            { key: "2", label: "Alumni", children: alumniFormUI },
          ]}
        />
      </Card>
    </motion.div>
  </div>
);
};

export default App;