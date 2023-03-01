import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../features/userSlice";
import Loading from "../utils/Loading";

const Register = () => {
  const Navigate = useNavigate();
  const [image, setImage] = useState();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [
    registerUser,
    { isLoading, data: registerData, isSuccess, isError, error },
  ] = useRegisterUserMutation();
  const { msg } = registerData || {};
  const { data } = error || {};
  const { message } = data || {};

  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", image);
    await registerUser(formData);
    setUser({ name: "", email: "", password: "" });
  };
  const props = {
    beforeUpload: (file) => {
      setImage(file);
      return false;
    },
  };
  useEffect(() => {
    if (isSuccess) {
      Navigate("/login");
    }
  }, [Navigate, isSuccess]);
  return (
    <div className="login-form-container">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="login-form">
            <div className="login-msg">
              <h1
                style={{
                  fontWeight: "bold",
                }}
              >
                Register Form
              </h1>
            </div>
            <div className="login-msg">
              <div>{isError && <>{message}</>}</div>
              <div>{isSuccess && <>{msg}</>}</div>
            </div>
            <div>
              <Input
                name="name"
                type="name"
                onChange={handleChange}
                value={user.name}
                placeholder="Name"
                required
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                onChange={handleChange}
                value={user.email}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <Input.Password
                name="password"
                type="password"
                onChange={handleChange}
                value={user.password}
                placeholder="Password"
                required
              />
            </div>
            <div>
              <Upload multiple {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </div>
            <div className="submit-btn" style={{ margin: "0 auto" }}>
              <Button
                style={{ background: "green" }}
                onClick={handleClick}
                htmlType="submit"
              >
                Submit
              </Button>
              <Button onClick={() => Navigate("/login")}>
                Have a already account?
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
