import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import StripeForm from "./StripeForm";
import { loadStripe } from "@stripe/stripe-js";
import OrderReview from "./OrderReview";
import { Elements } from "@stripe/react-stripe-js";
const PaymentForm = ({
  checkoutToken,
  backStep,
  nextStep,
  shippingData,
  captureCheckout,
  refreshCart,
}) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPEKEY);
  console.log(shippingData);
  return (
    <>
      <OrderReview checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Methods
      </Typography>
      <Elements stripe={stripePromise}>
        <StripeForm
          checkoutToken={checkoutToken}
          backStep={backStep}
          shippingData={shippingData}
          captureCheckout={captureCheckout}
          nextStep={nextStep}
          refreshCart={refreshCart}
        />
      </Elements>
    </>
  );
};

export default PaymentForm;
