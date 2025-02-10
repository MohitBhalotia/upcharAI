const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Medicine = require("../models/medicineModel");
const User = require("../models/UserModel");

const getMedicines = async (req, res) => {
  const { userId } = req.query; // Destructure userId from request body
  let medicines = await Medicine.find();

  // If userId is not provided, remove subsidized_price from each medicine

  if (userId === process.env.ADMIN_ID) {
    medicines = medicines.map((medicine) => {
      const { subsidized_price, ...medicineWithoutSubsidy } =
        medicine.toObject();
      return medicineWithoutSubsidy;
    });
  }
  res.status(StatusCodes.OK).json({ medicines });
};

const buyMedicine = async (req, res) => {
  const { cart, userId } = req.body;
  if (!userId) {
    throw new BadRequestError("User Id is required");
  }
  let user = (await User.findById(userId)) ;

  if (!userId) {
    throw new NotFoundError("User not required");
  }

  if (!cart || cart.length === 0) {
    throw new BadRequestError("Cart cannot be empty");
  }

  // Fetch user

  let totalBill = 0;
  const purchasedItems = [];

  // Process each medicine in the cart
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

    // Calculate cost for the full cart

    const medicine_cost =
      user._id.toString() !== process.env.ADMIN_ID
        ? medicine.subsidized_price * quantity
        : medicine.price * quantity;
    totalBill += medicine_cost;

    // Store medicine details
    purchasedItems.push({
      medicineId,
      name: medicine.name,
      quantity,
      cost: medicine_cost,
    });

    // Deduct quantity from stock
    await Medicine.findByIdAndUpdate(medicineId, {
      $inc: { quantity: -quantity },
    });
  }

  // Store total cart transaction in user's history
  if (user) {
    user.medicine_history.push({
      drugs: purchasedItems, // Store full list of medicines
      amount: totalBill, // Store total cart amount
    });

    await user.save();
  }

  res.status(StatusCodes.OK).json({
    msg: `${
      user?.name || "Someone"
    } purchased medicines successfully. Total bill: ₹${totalBill}`,
    totalBill,
    purchasedItems,
  });
};

module.exports = { getMedicines, buyMedicine };
