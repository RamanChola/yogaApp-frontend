import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/auth-context";
import Catalogue from "./Catalogue";
import SubscriberPage from "./SubscriberPage";

const Homepage = () => {
  const auth = useContext(AuthContext);
  const [isSubscribed, setIsSubscribed] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/data/isSubscribed/${auth.userId}`,
      {
        headers: { token: "Bearer " + auth.token },
      }
    );
    setIsSubscribed(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={auth.logout}>
        logout
      </Button>
      <Typography variant="h4" style={{margin: "20px 0 10px 0"}}>
        Welcome, {auth.username}
      </Typography>
      {isSubscribed && <SubscriberPage />}
      {isSubscribed == false && <Catalogue />}
    </>
  );
};

export default Homepage;
