const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

//routes
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin/users');
const catRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initRoutes = require('./routes/admin/initialData');
const pageRoutes = require('./routes/admin/page');
const addressRoutes = require('./routes/address');
const orderRoutes = require('./routes/order');
const adminOrderRoutes = require('./routes/admin/order.admin');

//environment variable
env.config();



// mongoDB mongodb+srv://root:<password>@cluster0.6ciei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.6ciei.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,

}).then( () =>{
    console.log("connected to database")
});

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', catRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initRoutes);
app.use('/api', pageRoutes);
app.use('/api', addressRoutes);
app.use('/api', orderRoutes);
app.use('/api', adminOrderRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})