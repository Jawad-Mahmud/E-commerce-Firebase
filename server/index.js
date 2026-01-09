import http from "http";
import Stripe from "stripe";
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_XXXXXX"); // Better: use env var

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Change to your frontend URL in production
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Only allow POST to our endpoint
  if (req.url === "/create-checkout-session" && req.method === "POST") {
    try {
      // Collect request body
      let body = "";
      for await (const chunk of req) {
        body += chunk;
      }

      const params = body ? JSON.parse(body) : {}; // In case you send items from frontend later

      // You can make this dynamic later based on params
      const line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Your Product Name", // Make dynamic later
            },
            unit_amount: 2000, // $20.00
          },
          quantity: 1,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items,
        success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}", // Optional: pass session ID
        cancel_url: "http://localhost:5173/cancel",
      });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ id: session.id }));
    } catch (error) {
      console.error("Stripe error:", error); // Log for debugging
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Failed to create checkout session",
          message: error.message,
        })
      );
    }
    return;
  }

  // 404 for everything else
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});