const Cart = require('../models/cart');


function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {
        Cart.findOneAndUpdate(condition, updateData, {upsert:true}).then(result => resolve())
        .catch(err => reject(err))
    })
}



exports.addCart = (req, res) => {

    Cart.findOne( {
        user: req.user._id
    }).exec((error, cart) => {
        if(error) return res.status(400).json({error});
        if(cart){

          // const product = req.body.cartItems.product;
           // const isAdded = cart.cartItems.find( c => c.product == product);
            let promiseArray = [];

            req.body.cartItems.forEach((cartItem) => {
                const product = cartItem.product;
                const item = cart.cartItems.find(c => c.product == product)
                let condition, action;

                if(item){
                    condition = {"user": req.user._id, "cartItems.product": product };
                    action = {
                        $set: {
                            "cartItems.$": cartItem
                        }
                    }
                } else{ // If cart exists then update the cart by 1
                    condition = {user: req.user._id};
                    action = {
                        $push: {
                            cartItems: cartItem
                        }
                    };
                }

                promiseArray.push(runUpdate(condition, action))
              });

            Promise.all(promiseArray).then(response => res.status(201).json({response}))
            .catch(error => res.status(400).json({error}))

        }else{
                // if cart does not exist then create new cart
               const cart = new Cart ({
                   user: req.user._id,
                   cartItems: req.body.cartItems
               });
            
                cart.save((error, cart) => {
                    if(error) return res.status(400).json({messag: error});
                    if(cart){
                        return res.status(201).json({cart});
                    }
                })
        }
    })
};

exports.getCartItems = (req, res) => {
    Cart.findOne({user: req.user._id}).populate('cartItems.product', '_id name price productPicture')
    .exec( (error,cart) => {
        if(error) return res.status(400).json({error});
        if(cart){
            let cartItems = {};
            cart.cartItems.forEach( (item, index) => {
                cartItems[item.product._id.toString()] = {
                    _id: item.product._id.toString(),
                    name: item.product.name,
                    img: item.product.productPicture[0].img,
                    price: item.product.price,
                    qty: item.quantity
                }
            })
            res.status(200).json({cartItems})
        }
    })
}