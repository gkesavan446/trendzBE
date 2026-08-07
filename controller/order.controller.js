import Order from '../model/order.model.js'

const saveOrder = async (req, res) => {
  try {
    // console.log("userId", req.user);
    const { id } = req.user
    const { products, totalPrice, paymentStatus, paymentId } = req.body;
    // console.log("userId", id);
    if (!products || products.length === 0 || !totalPrice) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const newOrder = new Order({
      userId: id,
      products,
      totalPrice,
      paymentStatus,
      paymentId
    });
    await newOrder.save();

    res.status(201).json({ message: "Order saved", order: newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", errorMSg: "Failed to save order", error: error.message });
  }
}

const allOrder = async (req, res) => {
  // const { userId } = req.params
  const { id } = req.user
  try {
    const orders = await Order.find({ userId: id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: "Failed to retrive order" });
  }
}

export { saveOrder, allOrder };