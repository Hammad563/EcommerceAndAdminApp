import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/';
import Layout from '../../components/Layout/layout'
import { generatePublicUrl } from '../../urlConfig';
import './productStore.css';
import {Link} from 'react-router-dom';

const ProductStore = (props) => {


    const dispatch = useDispatch();
    const product = useSelector(state => state.product)

    useEffect( () => {  
        const {match} = props
        dispatch(getProducts(match.params.slug))
    },[])



    

    console.log("All",product.productsByPrice)

    Object.keys(product.productsByPrice).map( (key, index) => {
        
        product.products.map( product => {
        console.log("Allproducts", product.name)
        })         
    })

    Object.keys(product.productsByPrice).map( (key,index) => {
        if(key !== "allProducts" && key !== "greater600"){
            product.products.map( product => {
               if(product.price > 600){
                   console.log()
               }
            })
        }
        

    })

   
    

    return (
        <>
        {
            
                Object.keys(product.productsByPrice).map( (key, index) => {
                    return(
                        
                        <div className='card'>
                        {/*Title and Button */}
                         <div className='cardHeader'>
                             <div>New {props.match.params.slug} products Just in!</div>
                             <a href="/AllProducts">View All</a>
                        </div>
                         {/* Products*/}
                         <div style={{display: 'flex'}}>
                             
                            {
                            
                                product.productsByPrice[key].map( (product) => 
                                   
                                        <Link  to={`/${product.slug}/${product._id}/p`}style={{display: 'block'}} className='productContainer'> 
                                        <div className='productImgContainer'>
                                            <img src={generatePublicUrl(product.productPicture[0].img)} alt="" />
                                        </div>
            
                                        <div className='productInfo'>
                                            <div>
                                                <div style={{margin: '5px 0'}}> {product.name}</div>
                                                <div className='productPrice'>${product.price}</div>
                                            </div>
                                        </div>
                                    </Link>
                                 )
                            }


                             
                         </div>
                      </div>
                    )               
                })
            }         
        </>
    )
}

export default ProductStore