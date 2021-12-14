import React, { useState, useEffect } from 'react'
import {Form, Button,Row, Col, Container} from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import NewModal from '../../components/UI/Input/modal';
import Input from '../../components/UI/Input/Input';
import createCategoryList from '../../helpers/createCategoryList';
import { useSelector, useDispatch } from 'react-redux';
import { createPage } from '../../actions/page.actions';

const Page = (props) => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);

    const category = useSelector(state => state.category)
    const dispatch = useDispatch()
    const page = useSelector(state => state.page)
    
    
    useEffect( () => {
        setCategories(createCategoryList(category.categories))
    },[category])

    useEffect( () => {
        console.log(page);
        if(!page.loading){
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }
    },[page])

 //--------------------------------------------------------------------///
    const onCategoryChange = (e) => {
        const category = categories.find(category => category._id == e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
    }

  

    const handleBannerImages = (e) => {
        console.log(e)
        setBanners([...banners, e.target.files[0]])
    }
    const handleProductImages = (e) => {
        console.log(e)
        setProducts([...products, e.target.files[0]])
    }

    const submitPageForm = (e) => {
        
        if(title === ""){
            alert('Title is required');
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);

        banners.forEach( (banner,index) => {
            form.append('banners', banner)
        })
        products.forEach( (product,index) => {
            form.append('products', product)
        })

        dispatch(createPage(form));

        console.log( {title, desc, categoryId, type, banners, products})
    }


    const renderPageModal = () => {
        return(
            <NewModal
                show = {createModal}
                modalTitle= {'Create New Page'}
                handleClose = { () => setCreateModal(false)}
                onSubmit = {submitPageForm}
            >
                <Row>
                    <Col>
                        { /*<select
                        className='form-control form-control-sm' 
                        value= {categoryId}
                        onChange= {onCategoryChange}
                        >
                                <option>Select Category</option>
                                {
                                categories.map( cat => 
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }
                            </select>*/}
                            <Input
                            type='select'
                            value={categoryId}
                            onChange={onCategoryChange}
                            options={categories}
                            placeholder="Choose Category"
                            >
                            </Input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            className='form-control form-control-sm' 
                            value={title}
                            onChange={ (e) => setTitle(e.target.value)}
                            placeholder = {'Page Title'}
                        >
                        </Input>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input
                            className='form-control form-control-sm' 
                            value={desc}
                            onChange={ (e) => setDesc(e.target.value)}
                            placeholder = {'Page Description'}
                        >
                        </Input>
                    </Col>
                </Row>

                <Row>
                    {
                        banners.length > 0 ? banners.map( (banner,index) =>
                        <Row key={index}>
                            <Col>{banner.name}</Col>
                        </Row>
                         ) : null
                    }
                    <Col>
                        <Input
                            className='form-control form-control-sm' 
                            type="file"
                            name="banners"
                            onChange={handleBannerImages}         
                        >
                        </Input>
                    </Col>
                </Row>

                <Row>
                    {
                        products.length > 0 ? products.map( (product,index) =>
                        <Row key={index}>
                            <Col>{product.name}</Col>
                        </Row>
                         ) : null
                    }

                    <Col>
                        <Input
                            className='form-control form-control-sm' 
                            type="file"
                            name="products"
                            onChange={handleProductImages}         
                        >
                        </Input>
                    </Col>
                </Row>

            </NewModal>
        )
    }

    return (
        <Layout sidebar>
            {
                page.loading ? <>
                <p>Creating Page...</p>
                </>
                :
                <>
                 {renderPageModal()}
                <button onClick={ () => setCreateModal(true)}>
                    Create
                </button>
                </>
            }
        </Layout>
    )
}

export default Page;

