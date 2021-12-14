const { addOrder, getOrder, getOrderStats } = require("../controllers/order");
const { requiresSignin, userMiddle } = require("../middleware/middle");
const router = require("express").Router();

router.post("/addOrder", requiresSignin, userMiddle, addOrder);
router.get("/getOrder", requiresSignin, userMiddle, getOrder);
router.post("/getOrderStatus", requiresSignin, userMiddle, getOrderStats);

module.exports = router;