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

const {Option} = Select;
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
  const degree= Form.useWatch("degree", studentForm);
  // const [alumniForm] = Form.useForm();

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

  React.useEffect(() => {
    studentForm.setFieldsValue({ dept: undefined });
  }, [degree]);

  const commonInputStyle = {
    height: 48,
    borderRadius: 14,
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
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

      <Form.Item name="degree" label="Degree"  rules={[{ required: true , message:"Please select Degree"}]}>
        <Select placeholder="Select Degree" style={commonInputStyle}>
          <Option value="BE">BE</Option>
          <Option value="ME">ME</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="dept"
        label="Department"
        rules={[{ required: true, message: "Please enter/select Department" }]}
      >
        {!degree ? (
          <Select
            disabled
            placeholder="Select Degree First"
            style={commonInputStyle}
          />
        ) : degree === "ME" ? (
          <Input
            placeholder="Enter Department"
            style={commonInputStyle}
          />
        ) : (
          <Select
            placeholder="Select Department"
            style={commonInputStyle}
            options={departments.map((d) => ({
              label: d,
              value: d,
            }))}
          />
        )}
      </Form.Item>

      <Form.Item name="regno" label="Register Number" rules={[{ required: true, message:"Please enter Register Number" }]}>
        <Input
          placeholder="Enter Register No."
          style={commonInputStyle}
          maxLength={16}
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

      <Form.Item name="feedback" label="Feedback" rules={[{ required: true, message:"Please provide your feedback" }]}>
        <Input.TextArea
          rows={4}
          placeholder="Feedback"
          maxLength={300}
          showCount
          style={{
            borderRadius: 12,
            resize: "none",
          }}
        />
      </Form.Item>

      <Button
        htmlType="submit"
        block
        loading={loading}
        style={{
          height: 50,
          borderRadius: 16,
          fontWeight: 600,
          fontSize: 15,
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          border: "none",
          marginTop:20,
          color: "#fff",
          boxShadow: "0 12px 30px rgba(124,58,237,0.5)",
          transition: "all 0.3s ease",
        }}
      >
        Submit Registration
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

  // const alumniFormUI = (
  //   <Form
  //     layout="vertical"
  //     form={alumniForm}
  //     onFinish={(v) => handleSubmit("Alumni", v)}
  //   >
  //     <Form.Item name="name" rules={[{ required: true }]}>
  //       <Input placeholder="Full Name" style={commonInputStyle} />
  //     </Form.Item>

  //     <Form.Item name="batch" rules={[{ required: true }]}>
  //       <Input
  //         placeholder="Batch (Eg: 2018 - 2022)"
  //         style={commonInputStyle}
  //       />
  //     </Form.Item>

  //     <Form.Item name="dept" rules={[{ required: true }]}>
  //       <Select
  //         placeholder="Select Department"
  //         style={commonInputStyle}
  //         options={departments.map((d) => ({ label: d, value: d }))}
  //       />
  //     </Form.Item>

  //     <Form.Item name="company" rules={[{ required: true }]}>
  //       <Input placeholder="Company / Organization" style={commonInputStyle} />
  //     </Form.Item>

  //     <Form.Item name="role" rules={[{ required: true }]}>
  //       <Input placeholder="Role / Designation" style={commonInputStyle} />
  //     </Form.Item>

  //     <Form.Item name="mobile" rules={[{ required: true }]}>
  //       <Input placeholder="Mobile Number" style={commonInputStyle} />
  //     </Form.Item>

  //     <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
  //       <Input placeholder="Email Address" style={commonInputStyle} />
  //     </Form.Item>

  //     <Button
  //       htmlType="submit"
  //       type="primary"
  //       block
  //       loading={loading}
  //       style={{
  //         height: 44,
  //         borderRadius: 10,
  //         fontWeight: 500,
  //       }}
  //     >
  //       Submit
  //     </Button>
  //   </Form>
  // );

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
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
        }}
      />

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
          <div
            style={{
              padding: "40px 30px",
              textAlign: "center",
              background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
              color: "white",
            }}
          >
            <Title
              level={3}
              style={{
                marginBottom: 6,
                color: "#fff",
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              gVERSE Attendance Portal
            </Title>

            <Text style={{ color: "rgba(255,255,255,0.85)" }}>
              Connect • Collaborate • Grow Together
            </Text>
          </div>

          <div style={{ padding: 30 }}>
            <Tabs
              centered
              size="large"
              items={[
                { key: "1", label: "🎓 Student", children: studentFormUI },
              ]}
            />
          </div>
        </Card>
      </motion.div>
    </div>
  </ConfigProvider>
);
};

export default App;