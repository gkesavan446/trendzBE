
import express from 'express';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handleCheckout = async (req, res) => {

    try {
        const { products } = req.body;
        // console.log(products);
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "No products found for checkout" });
        }

        const lineItems = products.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.title,
                    images: [item.image.url],
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],

            line_items: lineItems,

            mode: "payment",

            success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",

            cancel_url: "http://localhost:5173/cancel",
        });

        res.status(200).json({
            sessionId: session.id,
            url: session.url
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: "Payment failed",
        });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({
                message: "Session ID is required",
            });
        }

        const session = await stripe.checkout.sessions.retrieve(
            sessionId
        );

        if (session.payment_status !== "paid") {
            return res.status(400).json({
                message: "Payment was not successful",
            });
        }

        res.status(200).json({
            message: "Payment verified",
            paymentId: session.payment_intent,
            sessionId: session.id,
            paymentStatus: session.payment_status,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Payment verification failed",
            error: error.message,
        });
    }
};

export { handleCheckout, verifyPayment };