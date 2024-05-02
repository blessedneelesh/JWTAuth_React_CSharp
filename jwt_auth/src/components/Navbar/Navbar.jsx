import React, { useEffect, useState } from "react";
import { Menu, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

const Navbar = () => {
  const [current, setCurrent] = useState("/");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  var { token, logout, getUserProfile } = useAuth();

  const [userProfile, setUserProfile] = useState("");

  let navigate = useNavigate();

  const getCurrentUser = async () => {
    var data = await getUserProfile();
    setUserProfile(data);
    console.log(data);
  };

  const Logout = () => {
    logout();
    navigate("/profile");
    window.location.reload();
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home">
          {" "}
          <Link to="/">Home</Link>
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
              <Link to="/logout">Logout</Link>
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
