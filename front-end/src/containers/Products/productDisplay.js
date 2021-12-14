import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../actions';
import getParams from '../../utils/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../components/UI/Card';

const ProductDisplay = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product)
    const {page} = product;
    

    useEffect( () => {
        const params = getParams(props.location.search)
        console.log('parameters', params)
        const payload = {
            params
        }
        dispatch(getProductPage(payload))
    },[]);


    return (
      <>
        <div
          style={{
            width: "1100px",
            height: "100%",
            textAlign: "center",
            margin: "0 15px",
          }}
        >
          <h3>{page.title}</h3>
          <Carousel renderThumbs={() => {}} autoFocus>
            {page.banners &&
              page.banners.map((banner, index) => (
                <a
                  key={index}
                  style={{ display: "block" }}
                  href={banner.navigateTo}

                >
                  <img style={{ maxWidth: "100%" }} src={banner.img} alt="" />
                </a>
              ))}
          </Carousel>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: '10px 10px'
          }}
        >
          {page.products &&
            page.products.map((product, index) => (
              <Card
                key={index}
                style={{
                  width: "400px",
                  height: "200px",
                  margin: "5px, 10px",
                }}
              >
                <img style={{ width: "100%", height:'100%'}} src={product.img} alt="" />
              </Card>
            ))}
        </div>
      </>
    );
}
export default ProductDisplay;