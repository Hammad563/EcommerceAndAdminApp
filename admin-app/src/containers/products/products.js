import React from 'react'
import Layout from '../../components/Layout/Layout';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Table} from 'react-bootstrap';
import Input from '../../components/UI/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { AddProduct } from '../../actions/product.actions';
import NewModal from '../../components/UI/Input/modal';
import { generatePublicUrl } from '../../urlConfig';
import './products.css';

const Products = () => {

    const [show, setShow] = useState(false);
    const[name, setName] = useState('');
    const[price, setPrice] = useState('');
    const[quantity, setQuantity] = useState('');
    const[description, setDescription] = useState('');
    const[categoryId, setCategoryId] = useState('');
    const[productPictures, setProductPictures] = useState([]);
    const category = useSelector(state => state.category)
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const [productDetail, setProductDetail] = useState(false);
    const [productInfo, setProductInfo] = useState(null)
    // Handle product modal Submit button
    const handleClose = () =>{
        
        const form = new FormData();
        form.append('name',name);
        form.append('price',price);
        form.append('quantity',quantity);
        form.append('description',description);
        form.append('category',categoryId);
       
        for(let x of productPictures){
            form.append('productPicture',x);
        }
        dispatch(AddProduct(form));
         setShow(false);
    } 
    const handleShow = () => setShow(true);

    // Category List to show in modal
    const createCategoryList = (categories, options=[]) => {
        for(let category of categories){
            options.push({value: category._id, name: category.name});
            if(category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

        // Handle Adding Image in modal
    const handleProductPictures = (e) => {
        
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    }
        // handle Showing Products in table
    const renderProducts = () => {
        return(
            <Table style={{ fontSize: 12}} responsive="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            product.products.length > 0 ?
                            product.products.map(product =>
                        <tr onClick={ () => showProductDetails(product)} key={product._id}>
                            <td>2</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                             <td>{product.category.name}</td>
                        </tr>
                        ) : null
                        }
                        
                    </tbody>
            </Table>
        )
    }

    // handle showcasing Modal to add products
    const renderAddProductModal = () => {
        return(
            <NewModal
                 show={show}
                 handleClose={handleClose}
                 modalTitle = {'Add New Product'}
                 >
                    <Input
                            label = "Name"
                            value = {name}
                            placeholder={`Product Name`}
                            onChange = {(e) => setName(e.target.value)}
                    ></Input>
                    <Input
                            label = "Quantity"
                            value = {quantity}
                            placeholder={`Quantity`}
                            onChange = {(e) => setQuantity(e.target.value)}
                    ></Input>
                    <Input
                            label = "Price"
                            value = {price}
                            placeholder={`Price`}
                            onChange = {(e) => setPrice(e.target.value)}
                    ></Input>
                    <Input
                            label = "Description"
                            value = {description}
                            placeholder={`description`}
                            onChange = {(e) => setDescription(e.target.value)}
                    ></Input>

                     <select className='form-control'
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}>
                                        <option>select category</option>
                                        {
                                            createCategoryList(category.categories).map(option => 
                                                <option key={option.value} value={option.value}> {option.name}</option>
                                                )
                                        }
                    </select>

                        {productPictures.length > 0 ? productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null}
                    <input type = "file" name ="productPicture" onChange={handleProductPictures}>
                    </input>

                 </NewModal>
        )
    }

    const handleCloseDetailsModal = () => {
        setProductDetail(false);
    }

    const showProductDetails = (product) => {
        setProductDetail(true);
        setProductInfo(product);
    }

    const renderProductDetails = () => {
        if(!productInfo){
            return null;
        }
        return(

            <NewModal 
            show={productDetail} 
            handleClose={handleCloseDetailsModal}
            modalTitle={"Product Details"}
            size = "lg"
            >
               <Row>
                   <Col md="6">
                        <label className='key'>Name</label>
                        <p className='value'>{productInfo.name}</p>
                   </Col>
                   <Col md="6">
                        <label className='key'>Price</label>
                        <p className='value'>{productInfo.price}</p>
                   </Col>
                   <Col md="6">
                        <label className='key'>Quantity</label>
                        <p className='value'>{productInfo.quantity}</p>
                   </Col>
                   <Col md="6">
                        <label className='key'>Category</label>
                        <p className='value'>{productInfo.category.name}</p>
                   </Col>
                   <Col md="6">
                        <label className='key'>Description</label>
                        <p className='value'>{productInfo.description}</p>
                   </Col>
               </Row>
               <Row>
                   <Col>
                       <label className='key'>Product Pictures</label>
                       <div>
                            {productInfo.productPicture.map(picture => 
                                <div className='productImgContainer'>
                                    <img src ={generatePublicUrl(picture.img)}></img>
                                </div>
                            )}
                         </div>
                    
                   </Col>
               </Row>
            </NewModal>
        )
    }



    return(
        <Layout sidebar>

                <Container>
                        <Row>
                            <Col md={12}>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <h3>Products</h3>
                                        <button onClick={handleShow}>Add</button>
                                    </div>


                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                    {renderProducts()}
                            </Col>
                        </Row>
                </Container>
                 {renderAddProductModal()}
                 {renderProductDetails()}
               
        </Layout>
    )
}

export default Products;