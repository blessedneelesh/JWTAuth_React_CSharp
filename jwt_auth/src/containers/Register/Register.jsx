import React from "react";
import { Button, Form, Input, message } from "antd";

import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import "./Register.css";
const Register = () => {
  const { register, token } = useAuth();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Success:", values);
    const res = await register(values.username, values.email, values.password);
    console.log(res, "res");
    form.resetFields();
    message.success("User Successfully Created");
    if (token) {
      return <Navigate to="/admin" />;
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validatePassword = (rule, value, callback) => {
    console.log(value, "password");
    const passwordRegex =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{5,20}$/;
    if (!passwordRegex.test(value)) {
      callback(
        "Should contain atleast 1 uppercase, lowercase, number and atleast 6 character long!"
      );
    } else {
      callback();
    }
  };
  return (
    <>
      <div className="register">
        <div className="row">
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-1"></div>
          <div className="col-lg-4 col-md-8 col-sm-8 col-xs-10">
            <Form
              form={form}
              name="basic"
              style={{
                maxWidth: 600,
                marginTop: "15px",
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Email is not valid type!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  { validator: validatePassword },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <div className="formFooter">
                  <div className="one">
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </div>
                  <div className="two">
                    <Link to="/login">
                      <span style={{ fontSize: "0.9rem" }}>
                        Already have an Account? Login
                      </span>
                    </Link>{" "}
                  </div>
                </div>
              </Form.Item>
            </Form>
          </div>
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-1"></div>
        </div>
      </div>
    </>
  );
};
export default Register;
