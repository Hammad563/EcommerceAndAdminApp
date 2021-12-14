const { updateOrder, getCustomerOrders } = require("../../controllers/admin/order.admin");
const { adminMiddle, requiresSignin} = require("../../middleware/middle");

const router = require("express").Router();


router.post('/order/update', requiresSignin, adminMiddle, updateOrder)
router.post('/order/getCustomerOrders',requiresSignin, adminMiddle, getCustomerOrders )

module.exports = router;