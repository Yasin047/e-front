import { Input, Modal } from "antd";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setKey } from "../../features/searchSlice";

const SearchBar = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const setValue = () => {
    dispatch(setKey(searchValue));
    Navigate("/product");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div style={{ width: "20%", margin: "0 auto" }}>
      <AiOutlineSearch onClick={showModal} />
      <Modal
        title="Product Search"
        open={isModalOpen}
        onOk={setValue}
        onCancel={handleCancel}
        closable={false}
      >
        <Input
          name="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Product Name"
        />
      </Modal>
    </div>
  );
};

export default SearchBar;
