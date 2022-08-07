import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51LTrjFG0sfVPJ5sEOtXVGpMAQanLAQSjjkTwGlWtqokPyA8LkwcXiGER40izaWmxh2wD5nqcenpp7kq7TsMfdps9007ZArpu5c";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
