import express from 'express';
import { createEmployee,getAllEmpolyees,getSpecificEmployee,updateEmployee,deleteEmployee } from '../controllers/employeeController.js';

import { authenticate,authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';

const Router = express.Router();

Router.post('/create-employee',authenticate,authorizeAdmin,createEmployee);

Router.get('/allemployees',authenticate,authorizeAdmin,getAllEmpolyees);

Router.get('/specific-employee/:id',authenticate,authorizeAdmin,getSpecificEmployee);

Router.put('/update-employee/:id',authenticate,authorizeAdmin,updateEmployee)

Router.delete("/delete-employee/:id",authenticate,authorizeAdmin,deleteEmployee)




export default Router;