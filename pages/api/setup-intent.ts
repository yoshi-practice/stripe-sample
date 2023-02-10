/** @format */

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function handler(req, res) {
  if (req.method.toLocaleLowerCase() !== "post") {
    return res.status(405).end();
  }
  const customer = await stripe.customers.create({
    // payment_method: req.body.payment_method,
    metadata: {
      app_username: req.body.username,
    },
  });
  const response = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types: ["card"],
  });
  return res.status(200).json({
    client_secret: response.client_secret,
    customer_id: customer.id,
  });
}
