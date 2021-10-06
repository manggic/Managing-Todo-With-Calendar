import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useHistory } from "react-router-dom";

import loginLogo from "images/login.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import loginSvg from "images/login.svg";
import signupLogo from "images/signup-logo.png";

import "../styles/SignIn.css";
function SignIn() {
  const [state, setState] = useState({
    userName: "",
    password: "",
    whatOptionToShow: "LogIn",
  });
  const history = useHistory();
  const [form] = Form.useForm();

  const login = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);

    if (values.username && values.password) {
      localStorage.setItem("token", "signin");

      history.push("/");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="signIn">
      <div className="signInLeft">
        <img
          style={{
            width: "400px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
          src={loginSvg}
        />
      </div>

      <div className="signInRight">
        <div className="formContainer">
          <div className="imageContainer">
            <img
              style={
                state.whatOptionToShow === "LogIn"
                  ? {
                      width: "260px",
                      marginBottom: "20px",
                      alignSelf: "center",
                    }
                  : {
                      width: "200px",
                      marginBottom: "20px",
                      alignSelf: "center",
                    }
              }
              src={state.whatOptionToShow === "LogIn" ? loginLogo : signupLogo}
            />
          </div>

          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                value={""}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item> */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {state.whatOptionToShow}
              </Button>
              <div className="signupSection">
                Want to{" "}
                <span
                  onClick={() => {
                    form.resetFields();

                    setState({
                      // userName: "",
                      // password: "",
                      whatOptionToShow:
                        state.whatOptionToShow === "SignUp"
                          ? "LogIn"
                          : "SignUp",
                    });
                  }}
                  className="signup"
                >
                  {state.whatOptionToShow === "SignUp" ? "Log In" : "Sign Up"}
                </span>
              </div>
              {/* Or <a href="">register now!</a> */}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
