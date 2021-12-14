import React, { useEffect } from 'react'
import Layout from '../../components/Layout/layout'
import getParams from '../../utils/getParams';
import ListPage from './ListPage';
import ProductDisplay from './productDisplay';
import './ListPage.css';
import ProductStore from './productStore';


const ProductListPage = (props) => {

    const renderProducts = () => {
        console.log(props)
        const params = getParams(props.location.search);
       
        let content = null;
        switch(params.type){
            case 'store':
                content = <ProductStore {...props}></ProductStore>
            break;
            case 'product':
                content = <ProductDisplay {...props}></ProductDisplay>
            break;
            default:
                content = <ListPage {...props}></ListPage>
        }
        return content
    }

    return (
        <Layout>
               {renderProducts()}
        </Layout>
    )
}

export default ProductListPage
