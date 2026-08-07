import mongoose, { Schema } from 'mongoose'


const orderSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auth",
        },

        products: [
            {
                title: String,
                image: {
                    url: String
                },
                price: Number,
                quantity: Number,
            },
        ],

        totalPrice: Number,

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },

        paymentId: {
            type: String,
        },

    },
    {
        timestamps: true
    }
);

export default mongoose.model("Order", orderSchema);