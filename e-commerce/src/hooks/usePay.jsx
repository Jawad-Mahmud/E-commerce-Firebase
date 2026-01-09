// usePay.js
import { getStripe } from '../Payment/getStripe';

export const usePay = () => {
  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();
      if (!stripe) {
        console.error("Stripe failed to load");
        return;
      }

      // Call your Node.js server
      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // You can send cart data later, e.g., body: JSON.stringify({ items: [...] })
        body: JSON.stringify({}), // Empty for now, but keeps it consistent
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const { id: sessionId } = await response.json();

      if (!sessionId) {
        throw new Error("No session ID received from server");
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error("Stripe redirect error:", error.message);
        alert("Payment failed: " + error.message);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return { handleCheckout };
};