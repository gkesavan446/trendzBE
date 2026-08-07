import mongoose, { Schema } from "mongoose";

// {
//     "title": "Mens Cotton Jacket",
//     "description": "Great outerwear jackets for Spring/Autumn/Winter",
//     "price": 482,
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
//     "stock": 0,
//     "rating": 4.9,
// }

const productSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        description: {
            type: String,
            trim: true,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 1,
        },
        category: {
            type: String,
            trim: true,
            required: true
        },
        image: {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
        },
        stock: {
            type: Number,
            // trim: true, trim has no effect for numbers, its only effect in strings
            default: 10,
            min: 0
        },
        rating: {
            type: Number,
            trim: true,
            min: 0,
            max: 5,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Product', productSchema);