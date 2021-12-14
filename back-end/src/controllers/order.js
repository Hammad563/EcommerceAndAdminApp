
const Cart = require("../models/cart");
const Order = require("../models/order");
const Address = require("../models/address");

exports.addOrder = (req,res) => {

    Cart.deleteOne({user: req.user._id}).exec( (error,result) => {
        if(error) return res.status(400).json({error})
        if(result){
            req.body.user = req.user._id;

            req.body.orderStatus = [
                {
                    type: "ordered",
                    date: new Date(),
                    isCompleted: true
                },
                {
                    type: "packed",
                    isCompleted: false
                },
                {
                    type: "shipped",
                     isCompleted: false
                },
                {
                    type: "delivered",
                    isCompleted: false
                },
            ];
            const order = new Order(req.body);
            order.save((error, order) => {
              if (error) return res.status(400).json({ error });
              if (order) {
                res.status(201).json({ order });
              }
            });
        }
    })
};

exports.getOrder = (req,res) => {
    Order.find( {user: req.user._id}).select("_id paymentStatus items")
    .populate("items.productId", "_id name productPicture").exec( (error,order) => {
        if(error) return res.status(400).json({error})
        if(order){
            res.status(200).json({order})
        }
    })
}


exports.getOrderStats = (req,res) => {
    Order.findOne( {_id: req.body.orderId}).populate("items.productId","_id name productPicture").lean()
    .exec( (error,order) => {
        if (error) return res.status(400).json({error})
        if(order) {
            Address.findOne( {user: req.user._id}).exec( (error,address ) => {
                if(error) return res.status(400).json({error})
                order.address = address.address.find( (adr) => adr._id.toString() == order.addressId.toString());
                res.status(200).json({order})
            })
        }
    })
}