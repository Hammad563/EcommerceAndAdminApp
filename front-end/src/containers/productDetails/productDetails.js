import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById } from '../../actions';
import Layout from '../../components/Layout/layout'
import { MaterialButton } from '../../components/MaterialUI/material';
import { generatePublicUrl } from '../../urlConfig';
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import './productDetails.css'
import { addToCart } from '../../actions/cart.actions';


const ProductDetails = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product)

    useEffect( () => {

        const {productId} = props.match.params;
        
        const payload = {
            params: {
                productId
            }
        }
        dispatch(getProductDetailsById(payload));

    },[])

    if(Object.keys(product.productDetails).length === 0){
        return null;
    }
    console.log('product', product);

    return (
      <Layout>
        <div className="productDescriptionContainer">
          <div className="flexRow">
            <div className="productDescContainer">
              <div className="verticalImageStack">
                {product.productDetails.productPicture.map((thumb, index) => (
                  <div className="thumbnail">
                    <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                  </div>
                ))}
              </div>
              <div className="productDescImgContainer">
                <img
                  src={generatePublicUrl(
                    product.productDetails.productPicture[0].img
                  )}
                  alt={`${product.productDetails.productPicture[0].img}`}
                />
              </div>
            </div>
          </div>

          <div>
            {/* Displays Categories in arrow */}
            <div className="breed">
              <ul>
                <li>
                  <a href="/">Home</a>
                  <IoIosArrowForward></IoIosArrowForward>
                </li>
                <li>
                  <a href="#">Phones</a>
                  <IoIosArrowForward></IoIosArrowForward>
                </li>
                <li>
                  <a href="#">Apple</a>
                  <IoIosArrowForward></IoIosArrowForward>
                </li>
                <li>
                  <a href="#">{product.productDetails.name}</a>
                </li>
              </ul>
            </div>

            {/* Product Description*/}
            <div className="productDetails">
              <p className="productTitle">{product.productDetails.name}</p>
              <div>
                <span className="ratingCount">
                  4.3 <IoIosStar></IoIosStar>
                </span>
                <span className="ratingNumbers">
                  43,320 Ratings &amp; 3,128 Reviews{" "}
                </span>
              </div>
              <div className="extraOffer">Extra 20% Off </div>
              <div className="flexRow priceContainer">
                <span className="price">$ {product.productDetails.price}</span>
                <span className="discount" style={{ margin: "0 10px" }}>
                  22% off
                </span>
              </div>
              <div>
                <p>Available Offers</p>
                <p>
                  <span>Description </span>
                  <span>{product.productDetails.description}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* action buttons */}
        <div className="Buttons">
          <div className="flexRow">
            <MaterialButton
              title="Add to Cart"
              bgColor="#423e2c"
              textColor="#ffffff"
              style={{ marginRight: "5px" }}
              onClick= { () => {
                const {_id, name, price} = product.productDetails;
                const img = product.productDetails.productPicture[0].img;
                dispatch(addToCart({_id, name, price, img}));
                props.history.push(`/cart`)
              }}
            ></MaterialButton>
            <MaterialButton
              title="Buy Now"
              bgColor="#423e2c"
              textColor="#ffffff"
              style={{ marginRight: "5px" }}
            ></MaterialButton>
          </div>
        </div>
      </Layout>
    );
}

export default ProductDetails