const { StatusCodes } = require("http-status-codes");
const Cart = require("../models/CartModel");
const { BadRequestError, NotFoundError } = require("../errors");

// Add items to the cart (for both logged-in users and guests)
const addToCart = async (req, res) => {
  const { cart } = req.body; // Cart items from the request body
  const { userId } = req.query; // Get userId from query params

  if (!cart || cart.length === 0) {
    throw new BadRequestError("Cart cannot be empty");
  }

  if (!userId) {
    throw new BadRequestError("userId is required");
  }

  let userCart = await Cart.findOne({ user: userId });

  if (userCart) {
    // If the cart exists, update existing items or add new ones
    for (let item of cart) {
      const existingItemIndex = userCart.cart.findIndex(
        (cartItem) =>
          cartItem.medicineId.toString() === item.medicineId.toString()
      );

      if (existingItemIndex !== -1) {
        // If the item exists in the cart, update the quantity
        userCart.cart[existingItemIndex].quantity += item.quantity;
      } else {
        // If the item doesn't exist in the cart, add it
        userCart.cart.push(item);
      }
    }
  } else {
    // If no cart exists for the user, create a new cart
    userCart = new Cart({ cart, user: userId });
  }

  await userCart.save();

  // Return the updated cart
  return res.status(StatusCodes.CREATED).json({
    msg: "Product added to cart",
    cart: userCart.cart,
  });
};

// Get the user's cart (for logged-in users)
const getCart = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    throw new BadRequestError("UserId is required to fetch the cart");
  }

  let cart;

  if (userId) {
    // For logged-in users, fetch cart using userId
     cart = (await Cart.findOne({ user: userId })) || [];
  }
  // Return the cart data
  return res.status(StatusCodes.OK).json(cart);
};

const updateCart = async (req, res) => {
  const { userId } = req.query;
  const { medicineId, quantity } = req.body; // Get medicineId (medicineId) and the new quantity

  if (!medicineId || !quantity) {
    throw new BadRequestError("medicineId and quantity are required");
  }

  // Validate quantity (should be a positive number)
  if (quantity <= 0) {
    throw new BadRequestError("Quantity must be a positive number");
  }

  let userCart = await Cart.findOne({ user: userId });

  if (!userCart) {
    throw new NotFoundError("Cart not found for this user");
  }

  // Find the item to update
  const itemIndex = userCart.cart.findIndex(
    (item) => item.medicineId.toString() === medicineId.toString()
  );

  if (itemIndex === -1) {
    throw new NotFoundError("Item not found in cart");
  }

  // Update the quantity of the existing item
  userCart.cart[itemIndex].quantity = quantity;

  await userCart.save();

  // Return the updated cart
  return res.status(StatusCodes.OK).json({ msg: "Cart updated successfully" });
};

// Remove an item from the cart
const removeFromCart = async (req, res) => {
  const { userId } = req.query; // Get userId from authenticated user
  const { medicineId } = req.params; // Get medicineId (medicineId) to remove

  if (!medicineId) {
    throw new BadRequestError("medicineId is required");
  }

  let userCart = await Cart.findOne({ user: userId });

  if (!userCart) {
    throw new NotFoundError("Cart not found for this user");
  }

  // Find the index of the item to remove
  const itemIndex = userCart.cart.findIndex(
    (item) => item.medicineId.toString() === medicineId.toString()
  );

  if (itemIndex === -1) {
    throw new NotFoundError("Item not found in cart");
  }

  // Remove the item from the cart
  userCart.cart.splice(itemIndex, 1);

  await userCart.save();

  // Return the updated cart
  return res.status(StatusCodes.OK).json({ msg: "Item removed from cart" });
};
module.exports = { addToCart, getCart, updateCart, removeFromCart };
