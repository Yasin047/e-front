import { Button, Input } from "antd";
import { useState } from "react";
const { TextArea } = Input;

const ReportUs = () => {
  const [input, setInput] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    setInput({ name: "" });
    console.log(input);
  };
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div>
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 0",
        }}
      >
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Hey How can we improve our services
        </h2>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Report us for something...
        </h2>
        <div
          style={{
            width: "400px",
            margin: "auto",
            padding: "20px 0",
          }}
        >
          <Input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
            placeholder="Write your Name ..."
            required
            style={{
              border: "none",
              width: "100%",
              borderBottom: "1px solid #3BB77E",
              margin: "10px 0",
              height: "40px",
              borderRadius: "0",
            }}
          />
          <Input
            type="text"
            name="subject"
            onChange={handleChange}
            value={input.subject}
            placeholder="Write a Subject ..."
            required
            style={{
              border: "none",
              borderRadius: "0",
              width: "100%",
              borderBottom: "1px solid #3BB77E",
              margin: "10px 0",
              height: "40px",
            }}
          />
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            value={input.email}
            placeholder="write your Email ..."
            required
            style={{
              border: "none",
              borderRadius: "0",
              width: "100%",
              borderBottom: "1px solid #3BB77E",
              margin: "10px 0",
              height: "40px",
            }}
          />
          <TextArea
            rows={5}
            name="message"
            onChange={handleChange}
            value={input.message}
            required
            placeholder="write your message ..."
            style={{
              border: "none",
              borderRadius: "0",
              width: "100%",
              borderBottom: "1px solid #3BB77E",
              margin: "10px 0",
            }}
          ></TextArea>
          <Button
            style={{
              border: "none",
              borderRadius: "0",
              cursor: "pointer",
              width: "100%",
              background: "#3BB77E",
              height: "40px",
              margin: "10px 0",
              color: "#fff",
            }}
            onClick={handleClick}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportUs;
