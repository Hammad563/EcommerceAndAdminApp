const Category = require('../../models/cat');
const Order = require('../../models/order');
const Product = require('../../models/product');


function createCat(categories, parentId = null){
    const categoryList = [];
    let category;

    if(parentId == null){
       category  =  categories.filter( (cat) => cat.parentId == undefined)
    }else{
        category = categories.filter( (cat) => cat.parentId == parentId)
    }

    for(let cate of category){
        categoryList.push( {
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCat(categories, cate._id)
        });
    }

    return categoryList;
};



exports.initialData = async (req, res) => {

    const categories = await Category.find({}).exec();
    const products = await Product.find({}).select('_id name price quantity description productPicture category')
                                            .populate({path: 'category', select: '_id name'})
                                            .exec();
     const orders = await Order.find({}).populate("items.productId", "name").exec();                                
    res.status(200).json({
        categories: createCat(categories),
        products,
        orders
    })
}