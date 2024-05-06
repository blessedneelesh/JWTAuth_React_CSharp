import React, { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { Card } from "antd";
import { Spinner } from "../../components";
const Profile = () => {
  const { getUserProfile } = useAuth();

  const [userProfile, setUserProfile] = useState();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentUser = async () => {
    setIsLoading(true);
    var data = await getUserProfile();
    setUserProfile(data);
    console.log(data);
    setToken(localStorage.getItem("token"));
    setIsLoading(false);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        userProfile && (
          <div style={{ padding: "1rem" }}>
            <Card
              type="inner"
              title={
                `Hi, ` +
                userProfile.userName.charAt(0).toUpperCase() +
                userProfile.userName.slice(1)
              }
            >
              <p style={{ overflowWrap: "break-word" }}>
                <b>Token: </b>
                {token}
              </p>
              <p>
                <b>User Id: </b>
                {userProfile.id}
              </p>
              <p>
                <b>User Name: </b>
                {userProfile &&
                  userProfile.userName.charAt(0).toUpperCase() +
                    userProfile.userName.slice(1)}
              </p>
              <p>
                <b>Email: </b>
                {userProfile.email}
              </p>
            </Card>
          </div>
        )
      )}
    </>
  );
};

export default Profile;
