import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const items = [
  {
    label: <Link to="/">Home</Link>,
    key: "Home",
  },
  {
    label: <Link to="/users">User</Link>,
    key: "users",
  },
];

const Navbar = () => {
  const [current, setCurrent] = useState("/");
  console.log(current, "current state");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
};

export default Navbar;
