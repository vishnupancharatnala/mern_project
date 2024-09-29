import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";

const createEmployee = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email already exists in the database
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // If email is unique, proceed to create a new employee
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllEmpolyees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSpecificEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createEmployee, getAllEmpolyees, getSpecificEmployee, updateEmployee, deleteEmployee };
