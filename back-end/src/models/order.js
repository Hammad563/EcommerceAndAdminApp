const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            
        },
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserAddress.address",
           
        },
        totalAmount: {
            type: Number,
            
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                payablePrice: {
                    type: Number,
                    
                },
                purchaseQty: {
                    type: Number,
                    
                }
            }
        ],
        paymentStatus : {
            type: String,
            enum: ["pending", "completed", "cancelled", "refund"],
            
        },

        paymentType: {
            type: String,
            enum: ["cod", "card"],
            required: true
        },
        orderStatus: [
            {
                type:{
                    type: String,
                    enum: ["ordered", "packed", "shipped", "delivered"],
                    default: "ordered"
                },
                date: {
                    type: Date
                },
                isCompleted: {
                    type: Boolean,
                    default: false
                }
            }
        ]
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema);