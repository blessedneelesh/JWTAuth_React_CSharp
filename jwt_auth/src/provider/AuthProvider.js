import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();
//const API_URL = "https://localhost:50452/api/";
const API_URL =
  "https://jwtauthentication20240508135945.azurewebsites.net/api/";

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [roles, setRoles_] = useState(localStorage.getItem("roles"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setRoles = (newRole) => {
    setRoles_(newRole);
  };

  useEffect(() => {
    //if (token && !isExpired) {

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      localStorage.setItem("roles", roles);
      const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
      const isExpired = Date.now() >= jwtPayload.exp * 1000;
      if (isExpired) {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        window.location.reload();
      }
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
    }
  }, [token, roles]);

  const register = (username, email, password) => {
    return axios.post(API_URL + "Account/Register", {
      username,
      email,
      password,
    });
  };

  const login = (username, password) => {
    return axios
      .post(API_URL + "Account/Login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("roles", JSON.stringify(response.data.roles));
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
    window.location.reload();
  };

  const getUserProfile = async () => {
    var response = await axios.get(API_URL + "Account/GetProfile", {
      headers: { Authorization: "Bearer " + token },
    });

    // if (response.data.id == null) {
    //   localStorage.removeItem("token");
    console.log(response.data, "response.data");
    return response.data;
  };

  // const getCurrentUser = () => {
  //   return JSON.parse(localStorage.getItem("user"));
  // };

  const getAllUsers = () => {
    return axios
      .get(API_URL + "User/getUsers", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data);
  };

  const deleteUser = async (id) => {
    return await axios
      .post(API_URL + "User/Delete?id=" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data) {
          return { status: "201" };
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return "Username and Password doesn't match!";
        } else {
          console.log("Error", error.message);
          return { status: "403" };
        }
      });

    //return res;
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
    var res = axios.get(API_URL + "User/GetAllRoles", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
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
