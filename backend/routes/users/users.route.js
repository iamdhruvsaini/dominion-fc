import express from 'express'
import { addAdminHandler, addCustomerHandler, markUserSubscribedHandler, removeAdminHandler, updateAdminHandler, verifyAdminHandler } from '../../controllers/users/users.controller.js';
import { authenticateSuperAdmin } from '../../middlewares/authenticateSuperAdmin.js';
const router = express();


//admin route
router.post('/add-customer', addCustomerHandler);
router.post('/verify-admin', verifyAdminHandler);
router.post('/create-admin', authenticateSuperAdmin, addAdminHandler);
router.post('/remove-admin', authenticateSuperAdmin, removeAdminHandler);
router.post('/update-admin', updateAdminHandler);
router.post('/subscribe', markUserSubscribedHandler);


export default router;