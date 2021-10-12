import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@material-ui/core";

const StripeForm = ({
  checkoutToken,
  backStep,
  nextStep,
  shippingData,
  captureCheckout,
  refreshCart,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!elements || !stripe) return;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      console.log(error);
    } else {
      // object name has to be the same (street, town_city, country_state, postal_zip_code, coutnry)
      // otherwise the system can not generate the order correctly
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      captureCheckout(checkoutToken.id, orderData);
      refreshCart();
      console.log(checkoutToken.id);
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={backStep}>
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!stripe || !elements}
        >
          Pay {checkoutToken.live.total.formatted_with_code}
        </Button>
      </div>
    </form>
  );
};

export default StripeForm;
