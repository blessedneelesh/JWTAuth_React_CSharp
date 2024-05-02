import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const API_URL = "https://localhost:7051/api/";

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [roles, setRoles_] = useState(localStorage.getItem("roles"));

  console.log(roles, "hahha", token);
  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setRoles = (newRole) => {
    setRoles_(newRole);
  };

  useEffect(() => {
    //const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    //const isExpired = Date.now() >= jwtPayload.exp * 1000;
    // if (token && !isExpired) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      localStorage.setItem("roles", roles);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
    }
  }, [token, roles]);

  const register = (username, email, password) => {
    console.log(username, email, password);
    return axios.post(API_URL + "Account/Register", {
      username,
      email,
      password,
    });
  };

  const login = (username, password) => {
    console.log(username, password, "from login in auth");
    return axios
      .post(API_URL + "Account/Login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("roles", JSON.stringify(response.data.roles));
          console.log(JSON.stringify(response.data));
        }
        setToken(response.data.token);
        setRoles(response.data.roles);
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return "Username and Password doesn't match!";
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const getUserProfile = async () => {
    var response = await axios.get(API_URL + "Account/GetProfile");
    console.log(response.data);
    // if (response.data.id == null) {
    //   localStorage.removeItem("token");
    // }
    return response.data;
  };

  // const getCurrentUser = () => {
  //   return JSON.parse(localStorage.getItem("user"));
  // };

  const getAllUsers = () => {
    return axios.get(API_URL + "User/getUsers").then((res) => res.data);
  };

  const deleteUser = (id) => {
    var res = axios.post(API_URL + "User/Delete?id=" + id);
    return res;
  };

  const addToAdmin = async (id) => {
    var res = await axios.post(API_URL + "User/AddToAdmin?id=" + id);
    return res;
  };

  const removeFromAdmin = (id) => {
    var res = axios.post(API_URL + "User/RemoveFromAdmin?id=" + id);
    return res;
  };

  const getRolesList = () => {
    var res = axios.get(API_URL + "User/GetAllRoles");
    return res;
  };

  const deleteRole = (id) => {
    var res = axios.post(API_URL + "User/DeleteRole?id=" + id);
  };

  const addRoleAdmin = () => {
    var res = axios.post(API_URL + "User/CreateAdminRole");
    return res;
  };
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      register,
      login,
      logout,
      getUserProfile,
      roles,
      getAllUsers,
      deleteUser,
      addToAdmin,
      removeFromAdmin,
      getRolesList,
      deleteRole,
      addRoleAdmin,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <>
      {/* <Navbar /> */}
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
