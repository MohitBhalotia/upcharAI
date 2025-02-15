const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Medicine = require("../models/medicineModel");
const User = require("../models/UserModel");
const Order = require("../models/OrderModel");

// Buy Medicine and Create Order
const buyMedicine = async (req, res) => {
  const { cart, userId } = req.body;
  if (!userId) {
    throw new BadRequestError("User Id is required");
  }
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (!cart || cart.length === 0) {
    throw new BadRequestError("Cart cannot be empty");
  }

  let totalBill = 0;
  const purchasedItems = [];

  for (let item of cart) {
    const { medicineId, quantity } = item;

    if (!medicineId || !quantity || quantity <= 0) {
      throw new BadRequestError("Invalid medicine details in the cart");
    }

    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      throw new NotFoundError(`Medicine with ID ${medicineId} not found`);
    }

    if (medicine.quantity < quantity) {
      throw new BadRequestError(
        `Only ${medicine.quantity} units left for ${medicine.name}`
      );
    }

    const medicine_cost =
      user._id.toString() !== process.env.ADMIN_ID
        ? medicine.subsidized_price * quantity
        : medicine.price * quantity;
    totalBill += medicine_cost;

    purchasedItems.push({
      medicineId,
      name: medicine.name,
      quantity,
      cost: medicine_cost,
    });

    await Medicine.findByIdAndUpdate(medicineId, {
      $inc: { quantity: -quantity },
    });
  }

  const order = new Order({
    userId,
    items: purchasedItems,
    totalAmount: totalBill,
    createdAt: new Date(),
  });

  await order.save();

  user.medicine_history.push({
    drugs: purchasedItems,
    amount: totalBill,
  });

  await user.save();

  res.status(StatusCodes.OK).json({
    msg: `${
      user?.name || "Someone"
    } purchased medicines successfully. Total bill: ₹${totalBill}`,
    totalBill,
    purchasedItems,
    orderId: order._id,
  });
};

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("userId", "name email");
  res.status(StatusCodes.OK).json({ orders });
};

// Get My Orders (User)
const getMyOrders = async (req, res) => {
  const userId = req.user.userId;
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({ orders });
};

module.exports = {
  buyMedicine,
  getAllOrders,
  getMyOrders,
};
