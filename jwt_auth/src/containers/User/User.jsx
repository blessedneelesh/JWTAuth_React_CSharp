import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Button, message } from "antd";
import { useAuth } from "../../provider/AuthProvider";
import { Spinner } from "../../components";

const User = () => {
  const [users, setUsers] = useState("");
  const [seed, setSeed] = useState(true);
  const [roles, setRoles] = useState("");
  const [isDeleteLoading, setIsDeleteLoading] = useState([]);
  const [isRemoveFromAdminLoading, setIsRemoveFromAdminLoading] = useState([]);
  const [isAddToAdminLoading, setIsAddToAdminLoading] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isPageLoading, setIsPageLoading] = useState(false);

  const enterLoading = (index, type) => {
    if (type == 1) {
      setIsDeleteLoading((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
    } else if (type == 2) {
      setIsAddToAdminLoading((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
    } else {
      setIsRemoveFromAdminLoading((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
    }
  };

  const exitLoading = (index, type) => {
    if (type == 1) {
      setIsDeleteLoading((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    } else if (type == 2) {
      setIsAddToAdminLoading((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    } else {
      setIsRemoveFromAdminLoading((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }
  };

  const reset = () => {
    console.log("resett");
    setSeed(!seed);
  };
  console.log(users, "user");
  const {
    register,
    getAllUsers,
    deleteUser,
    addToAdmin,
    removeFromAdmin,
    getRolesList,
    deleteRole,
    addRoleAdmin,
  } = useAuth();

  const getUsers = async () => {
    setIsPageLoading(true);
    var res = await getAllUsers();
    setUsers(res);
    setIsPageLoading(false);
  };

  const onAddUser = async () => {
    var res = await register();
  };

  const onUserDelete = async (id, type) => {
    enterLoading(id, type);
    console.log(id);
    var res = await deleteUser(id);
    reset();
    message.success("Successfully Deleted!");
    exitLoading(id, type);
  };

  const onAddToAdmin = async (id, type) => {
    enterLoading(id, type);
    console.log(id);
    var res = await addToAdmin(id);
    reset();
    message.success("Successfully added!");
    exitLoading(id, type);
  };

  const onRemoveFromAdmin = async (id, type) => {
    enterLoading(id, type);
    console.log(id);
    var res = await removeFromAdmin(id);
    reset();
    message.success("Successfully removed!");
    exitLoading(id, type);
  };

  const getAllRoles = async () => {
    setIsPageLoading(true);
    var res = await getRolesList();
    setRoles(res.data);
    setIsPageLoading(false);
  };

  const onDeleteRole = async (userId) => {
    setIsLoading(true);
    var res = await deleteRole(userId);
    setIsLoading(false);
    reset();
  };

  const onAddRole = async () => {
    setIsLoading(true);
    var res = await addRoleAdmin();
    setIsLoading(false);
    reset();
  };

  useEffect(() => {
    getUsers();
    getAllRoles();
  }, [seed]);

  const userColumns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space>
            <Button
              type="primary"
              danger
              onClick={() => onUserDelete(record.userId, 1)}
              loading={isDeleteLoading[record.userId]}
            >
              Delete User
            </Button>{" "}
          </Space>
          <Space>
            <Button
              type="primary"
              onClick={() => onAddToAdmin(record.userId, 2)}
              loading={isAddToAdminLoading[record.userId]}
            >
              Add to Admin
            </Button>{" "}
          </Space>
          <Space>
            <Button
              type="primary"
              onClick={() => onRemoveFromAdmin(record.userId, 3)}
              loading={isRemoveFromAdminLoading[record.userId]}
            >
              Remove from Admin
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const roleColumns = [
    {
      title: "Role",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "Action",
      render: (record) => (
        <>
          {" "}
          <Button
            type="primary"
            danger
            onClick={() => onDeleteRole(record.id)}
            loading={isLoading}
            disabled
          >
            Delete Role
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ padding: "1rem" }}>
        <Link to="/register">
          {" "}
          <Button type="primary" style={{ margin: "10px" }}>
            Add User
          </Button>
        </Link>

        <h3>User Manager</h3>
        <Table
          size="small"
          columns={userColumns}
          dataSource={users}
          pagination={{ pageSize: 5 }}
          loading={isPageLoading}
        />
        <br></br>
        <h3>Role Manager</h3>
        {roles.length === 0 ? (
          <Button onClick={() => onAddRole()} loading={isPageLoading}>
            Add Admin Role
          </Button>
        ) : (
          <Table size="small" columns={roleColumns} dataSource={roles} />
        )}
      </div>
    </>
  );
};

export default User;
