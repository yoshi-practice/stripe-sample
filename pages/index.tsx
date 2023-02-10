import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useEffect, useState } from "react";
import Payment from "../components/Payment";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Home = () => {
  const [intent, setIntent] = useState(null);
  let options;

  useEffect(() => {
    fetch("/api/setup-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id: window.localStorage.getItem("customer_id") || "TEST",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIntent(data);
        if (data.customer_id) {
          window.localStorage.setItem("customer_id", data.customer_id);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (!intent || !intent.client_secret) return <p>loading</p>;
    options = {
    appearance: {
      theme: "stripe",
    },
    clientSecret: intent.client_secret,
  };
  return (
    <>
      <body>
        <div style={{ padding: "20px" }}>
          <Elements stripe={stripePromise} options={options}>
            <Payment />
          </Elements>
        </div>
      </body>
    </>
  );
};

export default Home;
