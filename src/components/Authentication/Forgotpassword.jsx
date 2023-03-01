import { Button, Input } from "antd";
import React, { useState } from "react";
import { useForgotPasswordMutation } from "../../features/userSlice";

const Forgotpassword = () => {
  const [
    forgotPassword,
    { isLoading, data: forgotPasswordData, isSuccess, isError, error },
  ] = useForgotPasswordMutation();

  const { msg } = forgotPasswordData || {};
  const { data } = error || {};
  const { message } = data || {};

  const [user, setUser] = useState({
    email: "",
  });
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
    await forgotPassword(user);
    setUser({ email: "" });
  };
  return (
    <div className="login-form-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="login-form">
            <div className="login-msg">
              <h1
                style={{
                  fontWeight: "bold",
                }}
              >
                Forgot Password
              </h1>
            </div>
            <div className="login-msg">
              <div>{isError && <>{message}</>}</div>
              <div>{isSuccess && <>{msg}</>}</div>
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
            <div className="submit-btn" style={{ margin: "0 auto" }}>
              <Button
                style={{ background: "green" }}
                onClick={handleClick}
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Forgotpassword;
