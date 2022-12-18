import { Typography } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/auth-context";

const SubscriberPage = () => {
  const [details, setDetails] = useState({});
  const auth = useContext(AuthContext);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/data/getSubscriptionDetails/${auth.userId}`,
      {
        headers: { token: "Bearer " + auth.token },
      }
    );
    setDetails(response.data.details[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  let date = details && details.sub_end;
  return (
    <>
      <Typography variant="body1">
        You are subscribed, {auth.username}
      </Typography>
      <Typography variant="body1">
        Your Batch: {details && details.batch_time}
      </Typography>
      <Typography variant="body1">
        Your subscription ends on: {date && date.split("T")[0]}
      </Typography>
    </>
  );
};

export default SubscriberPage;
