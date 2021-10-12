import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import useStyles from "./cartItemStyle";

const CartItem = ({ item, updateToCart, removeFromCart }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        image={item.image.url}
        alt={item.name}
        className={classes.media}
      ></CardMedia>
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => updateToCart(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => updateToCart(item.id, item.quantity + 1)}
          >
            +
          </Button>
          <Button
            variant="contained"
            type="button"
            color="secondary"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CartItem;
