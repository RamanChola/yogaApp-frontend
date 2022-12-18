import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/auth-context";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(3),
  },
}));

const Catalogue = () => {
  const [plans, setPlans] = useState([]);
  const [active, setActive] = useState(null);
  const auth = useContext(AuthContext);
  let navigate = useNavigate();
  const classes = useStyles();
  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/data/getPlans`,
      { headers: { token: "Bearer " + auth.token } }
    );
    setPlans(response.data.plans);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // handles dummy payment and subscrives the used with the selected plan id.
  const handlePayment = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/data/subscribe`,
        {
          client_id: auth.userId,
          plan_id: active.plan_id,
        },
        { headers: { token: "Bearer " + auth.token } }
      );
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ m: "20px 40px 20px 40px" }}>
      <Typography variant="h3" style={{ marginBottom: 10 }}>
        Choose A Plan
      </Typography>
      <Grid container spacing={3}>
        {plans.map((plan, i) => {
          return (
            <Grid item xs={12} md={3} key={i}>
              <Card variant="outlined">
                <CardHeader
                  title={plan.batch_time}
                  className={classes.cardHeader}
                ></CardHeader>
                <CardContent>
                  <Box px={1}>
                    <Typography variant="h3" component="h2" gutterBottom={true}>
                      ₹{plan.price}
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        component="span"
                      >
                        / mo
                      </Typography>
                    </Typography>
                  </Box>
                  <Button
                    variant={active == plan ? "contained" : "outlined"}
                    color="primary"
                    className={classes.primaryAction}
                    onClick={() => setActive(plan)}
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {active && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handlePayment}
          fullWidth
          style={{ marginTop: 10 }}
        >
          Pay
        </Button>
      )}
    </Box>
  );
};

export default Catalogue;
