import express from 'express'
import {addAdmin, addCustomer, markUserSubscribed, removeAdmin, updateAdmin, verifyAdmin } from '../../controllers/users/users.controller.js';
import { authenticateSuperAdmin } from '../../middlewares/authenticateSuperAdmin.js';
const router=express();


//admin route
router.post('/add-customer',addCustomer);
router.post('/verify-admin',verifyAdmin);
router.post('/create-admin',authenticateSuperAdmin,addAdmin);
router.post('/remove-admin',authenticateSuperAdmin,removeAdmin);
router.post('/update-admin',updateAdmin);
router.post('/subscribe',markUserSubscribed);


export default router;