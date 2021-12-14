import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getProducts } from '../../actions';
import Layout from '../../components/Layout/layout'
import Card from '../../components/UI/Card';
import { generatePublicUrl } from '../../urlConfig';

const ListPage = (props) => {

    const product = useSelector( (state) => state.product);
    const dispatch = useDispatch();

    useEffect( () => {
        const {match} = props;
        dispatch(getProducts(match.params.slug))
    },[])

    return (
       <div className='container'>
           <Card className="Card">
                {
                    product.products.map( (product) => (
                        <div className='caContainer'>
                            <Link className='caImgContainer' to={`/${product.slug}/${product._id}/p`}>
                                    <img src={generatePublicUrl(product.productPicture[0].img)} alt="" />
                            </Link>
                            <div>
                                <div className='caProductName'>{product.name}</div>
                                <div className='caProductPrice'>$ {product.price}</div>
                            </div>
                        </div>
                    ))
                }
           </Card>
       </div>
    )
}

export default ListPage