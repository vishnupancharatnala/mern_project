import mongoose from "mongoose";

// Define the employee schema
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  mobileNo: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  designation: {
    type: String,
    enum: ['HR', 'Manager', 'Sales'],
    required: true
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    required: true
  },
  course: {
    type: [String],
    enum: ['MCA', 'BCA', 'BSC'],
    required: true
  },
  image: {
    type: String, // You can store the path/URL to the image file
//     required: true
  }
}, {
  timestamps: true
});

// Export the model
const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
