import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const OrderReview = ({ checkoutToken }) => {
  console.log(checkoutToken);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Review
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem key={product.name} styles={{ padding: "10px 0" }}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            ></ListItemText>
            <Typography variant="body2">
              {product.line_total.formatted_with_code}
            </Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Subtotal" />
          <Typography variant="subtitle1">
            {checkoutToken.live.subtotal.formatted_with_code}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Tax" />
          <Typography variant="subtitle1">
            {checkoutToken.live.tax.amount.formatted_with_code}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {checkoutToken.live.total.formatted_with_code}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default OrderReview;
