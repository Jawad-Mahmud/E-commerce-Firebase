import http from "http";
import Stripe from "stripe";
import 'dotenv/config';

const stripe = new Stripe("sk_test_XXXXXX"); // SECRET KEY

const server = http.createServer(async (req, res) => {
  // Allow CORS (necessary for React)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle Stripe checkout session creation
  if (req.url === "/create-checkout-session" && req.method === "POST") {
    try {
      let body = "";
      req.on("data", chunk => (body += chunk));
      req.on("end", async () => {
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: { name: "Your Product" },
                unit_amount: 2000,
              },
              quantity: 1,
            },
          ],
          success_url: "http://localhost:5173/success",
          cancel_url: "http://localhost:5173/cancel",
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ id: session.id }));
      });
    } catch (error) {
      res.writeHead(500);
      res.end("Error creating session");
    }

    return;
  }

  // Default fallback
  res.writeHead(404);
  res.end("Not found");
});

server.listen(5000, () => {
  console.log("Server running on 5000");
});
