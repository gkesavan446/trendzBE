import mongoose, { Schema } from "mongoose";

const authSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        resetOTP: {
            type: String,
            default: ""
        },
        resetOTPExpiry: {
            type: Date,
            default: undefined
        },
        refreshToken: {
            type: String,
            default: ""
        },
        // cart: [
        //     {
        //         productId: {
        //             type: mongoose.Schema.Types.ObjectId,
        //             required: true
        //         },
        //         quantity: {
        //             type: Number,
        //             min: 0
        //         }
        //     }
        // ]
        cart: [
            {
                title: {
                    type: String,
                },
                description: {
                    type: String,
                },
                price: {
                    type: Number,
                },
                category: {
                    type: String,
                },
                image: {
                    url: {
                        type: String
                    }
                },
                stock: {
                    type: Number,
                },
                rating: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                    min: 0
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Auth', authSchema)