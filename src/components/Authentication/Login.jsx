import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../features/setUserSlice";
import { useLoginUserMutation } from "../../features/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [loginUser, { isLoading, data: loginData, isSuccess, isError, error }] =
    useLoginUserMutation();

  const { token, msg } = loginData || {};
  const { data } = error || {};
  const { message } = data || {};
  const [user, setUsers] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUsers((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    await loginUser(user);
    setUsers({ email: "", password: "" });
  };
  useEffect(() => {
    if (token) {
      dispatch(setUser({ token }));
      Navigate("/");
    }
  }, [Navigate, dispatch, token]);

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
                Login Form
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
            <div className="submit-btn" style={{ margin: "0 auto" }}>
              <Button
                style={{ background: "green" }}
                onClick={handleClick}
                htmlType="submit"
              >
                Submit
              </Button>
              <Button
                style={{ background: "green" }}
                onClick={() => Navigate("/register")}
              >
                Not Account? Register
              </Button>
              <Button onClick={() => Navigate("/forgotpassword")}>
                Forgotten password?
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
