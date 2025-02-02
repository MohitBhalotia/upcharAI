const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
});

const hospitalSchema = mongoose.Schema({
  hospital_name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  coordinates: {
    type: String,
  },
  discipline: {
    type: String,
    required: true,
  },
  address: {
    type: String
  },
  state: {
    type: String,
    
  },
  district: {
    type: String,
    
  },
  pincode: {
    type: String,
    
  },
  mobile: {
    type: String,
  },
  state_id: {
    type: String,
    
  },
  district_id: {
    type: String,
    
  },
  doctors: [doctorSchema],
});

const hospitalModel = mongoose.model("Hospital", hospitalSchema);

module.exports = hospitalModel;
