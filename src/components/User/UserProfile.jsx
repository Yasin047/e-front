import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Upload } from "antd";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useUserUpdateMutation } from "../../features/userSlice";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import Navbar from "../Home/Navbar";
import Loading from "../utils/Loading";

const UserProfile = () => {
  const Navigate = useNavigate();
  const [userUpdate, { isLoading, data, isSuccess, isError, error }] =
    useUserUpdateMutation();
  const { updatedProfile } = data || {};
  const token =
    Cookies.get("token") !== undefined
      ? "Bearer " + JSON.parse(Cookies.get("token")).token
      : null;
  const isExist = token ? jwt_decode(token) : null;
  const { name, email, image: profileImage } = isExist || {};
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("email", isExist.email);
    if (image) {
      formData.append("image", image);
    }
    if (password === confirmPassword) {
      await userUpdate(formData);
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
    setIsModalOpen(false);
  };
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const showImageModal = () => {
    setIsImageModalOpen(true);
  };
  const handleCancelImage = () => {
    setIsImageModalOpen(false);
  };
  const setImageValue = () => {
    setIsImageModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const setValue = () => {
    setIsModalOpen(false);
  };
  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = <p>{data?.message}</p>;
  } else if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  const props = {
    beforeUpload: (file) => {
      setImage(file);
      return false;
    },
  };
  return (
    <div>
      <Header />
      <Navbar />
      <ToastContainer />
      <div
        style={{
          borderBottom: "1px solid rgb(170, 166, 166)",
          // marginTop: "30px",
        }}
      ></div>
      <div className="user-profile">
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "30px",
            paddingBottom: "20px",
          }}
        >
          My Profile
        </h2>
        {content && (
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <h3>{content}</h3>
          </div>
        )}
        <img
          src={updatedProfile?.image ? updatedProfile?.image.url : profileImage}
          alt=""
        />
        <Button
          style={{ marginTop: "10px" }}
          onClick={showImageModal}
          type="primary"
          danger
        >
          Change Picture
        </Button>
        <Modal
          title="Image Modal"
          open={isImageModalOpen}
          onOk={setImageValue}
          onCancel={handleCancelImage}
          closable={false}
        >
          <div style={{ marginBottom: "10px" }}>
            <Upload multiple {...props}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </div>
          <Button onClick={handleClick} type="primary" danger>
            Submit
          </Button>
        </Modal>

        <div className="user-name">
          <div className="user-span">
            <span>Name : </span>
            {name}
          </div>
          <div className="user-span">
            <span>Email : </span>
            {email}
          </div>
          <div className="user-update">
            <span
              className="product-details"
              onClick={() => Navigate("/user/all-order")}
            >
              My Orders
            </span>
            <span>
              <span className="product-details" onClick={showModal}>
                Change Password
              </span>
              <Modal
                title="Password Modal"
                open={isModalOpen}
                onOk={setValue}
                onCancel={handleCancel}
                closable={false}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
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
                  <div>
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      onClick={handleClick}
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Modal>
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          borderBottom: "1px solid rgb(170, 166, 166)",
        }}
      ></div>
      <Footer />
    </div>
  );
};

export default UserProfile;
