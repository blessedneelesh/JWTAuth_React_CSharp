import React, { useEffect, useState } from "react";
import { Menu, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { Login } from "../../containers";

const Navbar = () => {
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  var { token, logout, getUserProfile } = useAuth();

  let navigate = useNavigate();

  const Logout = async () => {
    await logout();

    //window.location.reload();
  };

  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home">
          {" "}
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="user">
          <Link to="/users">User</Link>
        </Menu.Item>

        {token ? (
          <>
            <Menu.Item key="name" style={{ marginLeft: "auto" }}>
              {/* {userProfile.userName ? (
                <span>
                  {userProfile.userName.charAt(0).toUpperCase() +
                    userProfile.userName.slice(1)}
                </span>
              ) : (
                ""
              )} */}
            </Menu.Item>
            <Menu.Item key="logout">
              <Link onClick={() => Logout()}>Logout</Link>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login" style={{ marginLeft: "auto" }}>
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register">Register</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </>
  );
};

export default Navbar;
