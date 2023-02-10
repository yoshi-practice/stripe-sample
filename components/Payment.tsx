import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        await stripe.confirmSetup({
          elements,
          confirmParams: {
            return_url: "http://localhost:3000",
          },
        });
      }}>
      <PaymentElement />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Payment;
