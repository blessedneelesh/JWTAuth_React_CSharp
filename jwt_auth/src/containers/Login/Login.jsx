import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { Alert } from "antd";
import "./Login.css";
const Login = () => {
  const { login } = useAuth();

  let navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const openErrorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Username and password do not match!",
      duration: 3,
    });
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
    var aa = await login(values.username, values.password);
    if (aa.token) {
      navigate("/profile");
      // window.location.reload();
    } else {
      openErrorMessage();
    }

    console.log(aa, "tk");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="register">
        <div className="row">
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-1"></div>
          <div className="col-lg-4 col-md-8 col-sm-8 col-xs-10">
            {contextHolder}
            <Form
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
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
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
                    <Link to="/register">
                      <span style={{ fontSize: "0.9rem" }}>
                        Do not have an Account? Register
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
export default Login;
