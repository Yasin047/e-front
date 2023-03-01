import { Button, Input } from "antd";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  useResetPasswordMutation,
  useVerifyTokenMutation,
} from "../../features/userSlice";
import Loading from "../utils/Loading";

const Resetpassword = () => {
  const [resetPassword, { isLoading, data, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = useLocation().search.slice(7, useLocation().search.length);
  const [
    verifyToken,
    {
      isLoading: verifyLoading,
      // data: verifyData,
      isSuccess: verifyIsSuccess,
      isError: verifyIsError,
      error: verifyError,
    },
  ] = useVerifyTokenMutation();

  useEffect(() => {
    verifyToken({ token });
  }, [token, verifyToken]);
  let content;
  if (isLoading || verifyLoading) {
    content = <Loading />;
  } else if (isSuccess || verifyIsSuccess) {
    content = <p>{isSuccess ? data?.message : ""}</p>;
  } else if (isError || verifyIsError) {
    content = (
      <p>{isError ? error?.data.message : verifyError?.data.message}</p>
    );
  }
  const handleClick = async (e) => {
    e.preventDefault();
    const { email } = jwt_decode(token);
    if (password === confirmPassword) {
      await resetPassword({ password, email });
    } else {
      toast.error("Password Mismatch!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <div className="login-msg">
          <h1
            style={{
              fontWeight: "bold",
            }}
          >
            Reset Password
          </h1>
          {content && (
            <div
              style={{
                textAlign: "center",
                padding: "10px",
              }}
            >
              {content}
            </div>
          )}
        </div>
        <ToastContainer />
        <div>
          <Input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <Input
            name="confirmpassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm-Password"
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
    </div>
  );
};

export default Resetpassword;
