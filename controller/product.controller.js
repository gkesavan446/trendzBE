import Product from '../model/product.model.js';
import dotenv from 'dotenv'
dotenv.config()
import { v2 as cloudinary } from "cloudinary";
// import redisClient from '../config/redis.js';


cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`,
});


const createProduct = async (req, res) => {
    // console.log("req.body", req.body)
    try {
        const { title, description, price, category, stock, rating } = req.body;
        if (!title || !description || !price || !category || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // 🔹 Upload image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, { folder: "products", });
        const imageUrl = {
            url: uploadedImage.secure_url,
            public_id: uploadedImage.public_id,
        }
        const existProduct = await Product.findOne({ title });

        if (existProduct) {
            return res.status(400).json({ message: "Product already exists" });
        }
        const result = await Product.create({
            title,
            description,
            price,
            category,
            image: imageUrl,
            stock,
            rating,
        });
        res.status(201).json({ message: "Created Successfully", createdProduct: result });
    } catch (error) {

        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getALLProducts = async (req, res) => {
    try {
        const result = await Product.find();
        if (result.length == 0 || !result) {
            return res.status(404).json({ message: "No Produts Found" })
        }
        res.status(200).json({ message: "Successfully fetched", products: result });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", Error: error.message });
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        // const result = await Product.findOne({ _id: id });
        const result = await Product.findById(id);
        if (!result) {
            return res.status(400).json({ message: "Invalid or No product found" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", Error: error.message })
    }
}

const updateProductById = async (req, res) => {
    const { id } = req.params
    // console.log("title", req.body)
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Invalid or No product found" });
        }
        if (req.file) {
            await cloudinary.uploader.destroy(product.image?.public_id);

            const uploadedImage = await cloudinary.uploader.upload(req.file.path, { folder: "products" });

            product.image = {
                url: uploadedImage.secure_url,
                public_id: uploadedImage.public_id,
            };
        }

        if (req.body.title !== undefined) product.title = req.body.title;
        if (req.body.description !== undefined) product.description = req.body.description;
        if (req.body.price !== undefined) product.price = req.body.price;
        if (req.body.stock !== undefined) product.stock = req.body.stock;
        if (req.body.category !== undefined) product.category = req.body.category;
        if (req.body.rating !== undefined) product.rating = req.body.rating;

        await product.save();

        res.status(200).json({ message: "Updated Successfully", updatedProduct: product })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", Error: error.message });
    }
}

const deleteProductById = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Invalid or No such product ID found" })
        }

        await cloudinary.uploader.destroy(product.image.public_id);
        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "Deleted Successfully", deletedProduct: product })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", Error: error.message });
    }
}

export { createProduct, getALLProducts, getProductById, updateProductById, deleteProductById };