import React from "react";
import {
  Typography,
  Divider,
  Button,
  CircularProgress,
  Link,
} from "@material-ui/core";
import useStyle from "./confirmationStyle";
import { Link as RouterLink } from "react-router-dom";
const Confirmation = ({ order }) => {
  const classes = useStyle();
  // const handleCart = () => refreshCart();
  if (order.customer) {
    return (
      <>
        <div>
          <Typography variant="h5">
            Thank You For Your Purchase,&ensp;
            {order.customer.firstname + " " + order.customer.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order reference:{" "}
            <Link href="#" underline="hover">
              {order.customer_reference}
            </Link>
          </Typography>
        </div>
        <br />
        <Button
          component={RouterLink}
          to="/menu"
          variant="outlined"
          // onClick={handleCart}
        >
          Back To Home
        </Button>
      </>
    );
  } else {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }
};

export default Confirmation;
