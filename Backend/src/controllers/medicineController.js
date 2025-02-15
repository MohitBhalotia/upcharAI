const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const cloudinary = require("cloudinary").v2;
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

const addMedicine = async (req, res) => {
  const { name, price, subsidized_price, quantity } = req.body;

  if (!name || !price || !subsidized_price || !quantity || !req.file) {
    throw new BadRequestError(
      "All fields including an image are required to add a medicine"
    );
  }

  let imageUrl;
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      folder: "medicines",
    });
    imageUrl = result.secure_url;
  } catch (error) {
    throw new BadRequestError("Image upload failed");
  }

  const newMedicine = new Medicine({
    image: imageUrl,
    name,
    price,
    subsidized_price,
    quantity,
  });
  await newMedicine.save();

  res.status(StatusCodes.CREATED).json({
    message: "Medicine added successfully",
    medicine: newMedicine,
  });
};

const updateMedicine = async (req, res) => {
  const { medicineId } = req.params;
  const updateData = req.body;

  const updatedMedicine = await Medicine.findByIdAndUpdate(
    medicineId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedMedicine) {
    throw new NotFoundError("Medicine not found");
  }

  res.status(StatusCodes.OK).json({
    message: "Medicine updated successfully",
    medicine: updatedMedicine,
  });
};

const removeMedicine = async (req, res) => {
  const { medicineId } = req.params;

  const deletedMedicine = await Medicine.findByIdAndDelete(medicineId);

  if (!deletedMedicine) {
    throw new NotFoundError("Medicine not found");
  }

  res.status(StatusCodes.OK).json({
    message: "Medicine removed successfully",
    medicine: deletedMedicine,
  });
};

module.exports = {
  getMedicines,
  addMedicine,
  updateMedicine,
  removeMedicine,
};
