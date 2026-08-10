import bcrypt from 'bcrypt'
import Auth from '../model/auth.model.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

const signup = async (req, res) => {
    const { username, email, password, role } = req.body

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All Fields are required" });
        }
        const user = await Auth.findOne({ email: email });
        if (user) {
            console.log("user", user)
            return res.status(400).json({ message: "User Exists Already!!!" });
        }
        const result = await Auth.create({
            username: username,
            email: email,
            password: await hashPassword(password),
            role: role
        })
        res.status(201).json({
            message: "Created Successfully", createdUser: {
                id: result._id,
                username: result.username,
                email: result.email,

            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", Error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All Fields are required!" });
        }
        const user = await Auth.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "No users found!!!" });
        }
        const authUser = await bcrypt.compare(password, user.password);
        if (!authUser) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const payload = { userId: user._id, username: user.username, role: user.role }
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' })
        return res.status(200).json({ message: "Loggedin Successfully!", token: token, cart: user.cart })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", Error: error.message });
    }
}

const generateOTP = () => {
    // console.log(crypto.randomInt(100000, 1000000).toString())
    return crypto.randomInt(100000, 1000000).toString()
}

// const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: `${process.env.EMAIL_USER}`,
//         pass: `${process.env.EMAIL_PASS}`
//     }
// })

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transport.verify((error, success) => {
    if (error) {
        console.log("Email connection failed:", error);
    } else {
        console.log("Email server is ready");
    }
});



const forgotPassword = async (req, res) => {
    // console.log("check")
    const { email } = req.body
    try {
        if (!email) {
            return res.status(400).json({ message: "Enter your email address" });
        }
        const authUser = await Auth.findOne({ email: email });
        if (!authUser) {
            return res.status(400).json({ message: "Invalid or no user found" });
        }
        let OTP = generateOTP()
        let hashedOTP = await hashPassword(OTP)
        authUser.resetOTP = hashedOTP
        authUser.resetOTPExpiry = Date.now() + 2 * 60 * 1000
        await authUser.save();

        await transport.sendMail(
            {
                from: `"Authentication and Reset APP"<${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Password Reset OTP",
                html: `<p>Your OTP is <b>${OTP}</b>. It expires in 2 minutes.</p>`
            }
        )

        res.status(200).json({ message: "OTP sent to your email." })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", Error: error.message });
    }
}

const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body
    try {
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "All Fields are required" })
        }
        const user = await Auth.findOne({ email: email });
        if (!user || !user.resetOTP) {
            return res.status(400).json({ message: "Invalid Request" })
        }
        if (user.resetOTPExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP is Expired" })
        }
        const authUser = await bcrypt.compare(otp, user.resetOTP);
        if (!authUser) {
            return res.status(400).json({ message: "Incorrect OTP" })
        }
        user.password = await hashPassword(newPassword)
        user.resetOTP = undefined
        user.resetOTPExpiry = undefined
        await user.save()

        res.status(200).json({ message: "Password reset Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", Error: error.message });
    }

}

const addtoCart = async (req, res) => {
    const { id } = req.user
    const { cart } = req.body
    if (!id || !cart || !Array.isArray(cart)) {
        return res.status(400).json({ message: "Invalid User ID or Cart Items" })
    }
    try {
        // const user = await Auth.findOne({ _id: id });
        // user.cart = cart
        // await user.save();
        const user = await Auth.findByIdAndUpdate(id, { $set: { cart } }, { returnDocument: "after" });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(201).json({ message: "Cart Saved", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", Error: error.message })
    }
}


export { signup, login, forgotPassword, resetPassword, addtoCart };