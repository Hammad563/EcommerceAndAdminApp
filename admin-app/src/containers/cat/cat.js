
import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory, updateCategory, deleteCatAction} from '../../actions/';
import Input from '../../components/UI/Input/Input';
import NewModal from '../../components/UI/Input/modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {IoIosCheckmarkCircleOutline, IoIosCheckmarkCircle, IoMdArrowDown, IoMdArrowForward, IoIosAdd, IoMdTrash, IoMdCreate} from 'react-icons/io'
import './cat.css'

const Category = (props) => {

    // Dispatch/useSelector
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);

    // add Category Modal
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');

    // Edit Category Modal
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const[updateModal, setUpdateModal] = useState(false);

    // Delete Category Modal
    const [deleteCategory, setDeleteCategory] = useState(false);

    useEffect( () => {
        if(!category.loading){
            setShow(false);
        }
    }, [category.loading])
    







    //------Functions -------////
    
    // modals close
    const handleClose = () =>{
        if(categoryName === ""){
            alert('Category name is required')
            setShow(false);
            return;
        }

        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));

        setCategoryName('');
        setParentCategoryId('');
         setShow(false);
    } 
    // modal show
    const handleShow = () => setShow(true);

    // display categories 
    const renderCategories = (categories) =>{
        let myCategories = [];
         for(let category of categories){
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length  > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories
    }
    // create category list
    const createCategoryList = (categories, options=[]) => {
        for(let category of categories){
            options.push({
                value: category._id, 
                name: category.name,
                parentId: category.parentId,
                type: category.type
                });
            if(category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }
        return options;
    }
    // handle image
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

 //--------------------------------------------------------------------///


    // update Category Function
    const updateCategoryFunc = () => {
        updateCheckAndExpanded();
        setUpdateModal(true);
        
    }

    const updateCheckAndExpanded = () => {
        const cat = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];

        checked.length > 0 && checked.forEach( (categoryId, index) => {
            const category = cat.find( (category, _index) => categoryId == category.value);
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach( (categoryId, index) => {
            const category = cat.find( (category, _index) => categoryId == category.value);
            category && expandedArray.push(category)
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);

        console.log( {checked, expanded, cat, checkedArray, expandedArray})
    }


    // handle update input
    const handleCategoryInput = (key, value, index, type) => {
        if( type == 'checked'){
           const newCheckedArray = checkedArray.map( (item, _index) => index == _index ? {...item, [key]: value } : item);
           setCheckedArray(newCheckedArray)
        }
        else if(type == 'expanded'){
            const newExpandedArray = expandedArray.map( (item, _index) => index == _index ? {...item, [key]: value } : item);
            setExpandedArray(newExpandedArray)
        }
    }

    // form data 
    const updateForm = () => {
        const form = new FormData();
        expandedArray.forEach( (item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('type', item.type);
            form.append('parentId', item.parentId ? item.parentId : "" );
        })

        checkedArray.forEach( (item,index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('type', item.type);
            form.append('parentId', item.parentId ? item.parentId : "" );
        })
        dispatch(updateCategory(form))
        setUpdateModal(false);
        
    }

    // render update Category
    const renderUpdateCategoriesModal = () => {
        return(
            <NewModal 
                show={updateModal} 
                handleClose={() => setUpdateModal(false)} 
                onSubmit= {updateForm}
                modalTitle={'Edit Categories'}
                size = 'lg'
                >
                    <Row>
                        <Col>
                            <h6>Expanded Categories</h6>
                        </Col>
                    </Row>

                        {
                            expandedArray.length > 0 && expandedArray.map( (item, index) =>
                                <Row key={index}>
                                    <Col>
                                        <Input
                                            value = {item.name}
                                            placeholder={`Category Name`}
                                            onChange = {(e) => handleCategoryInput('name', e.target.value, index, 'expanded') }
                                        ></Input>
                                    </Col>

                                    <Col>
                                        <select className='form-control'
                                                value={item.parentId}
                                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                                <option>select category</option>
                                                    {
                                                        createCategoryList(category.categories).map(option => 
                                                        <option key={option.value} value={option.value}> {option.name}</option>
                                                        )
                                                    }
                                        </select>
                                    </Col>

                                    <Col>
                                        <select className='form-control'
                                            value={item.type}
                                            onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                                        >
                                            <option >Select Type</option>
                                            <option value="store">Store</option>
                                            <option value="product">Product</option>
                                        </select>
                                    </Col>
                                </Row>
                            )
                        }
                                            <h6>Selected Categories</h6>
                        {
                            checkedArray.length > 0 && checkedArray.map( (item, index) =>
                                <Row key={index}>
                                    <Col>
                                        <Input
                                            value = {item.name}
                                            placeholder={`Category Name`}
                                            onChange = {(e) => handleCategoryInput('name', e.target.value, index, 'checked') }
                                        ></Input>
                                    </Col>

                                    <Col>
                                        <select className='form-control'
                                                value={item.parentId}
                                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                                <option>select category</option>
                                                    {
                                                        createCategoryList(category.categories).map(option => 
                                                        <option key={option.value} value={option.value}> {option.name}</option>
                                                        )
                                                    }
                                        </select>
                                    </Col>

                                    <Col>
                                        <select className='form-control'
                                         value={item.type}
                                         onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                        >
                                            <option >Select Type</option>
                                            <option value="store">Store</option>
                                            <option value="product">Product</option>
                                        </select>
                                    </Col>
                                </Row>
                            )
                        }            
                            <Input type="file" name="categoryImage" onChange={handleCategoryImage}></Input>
                    </NewModal>
        )
    }
    // render Add 
    const renderAddCategoriesModal = () => {
        return(
            <NewModal 
            show={show} 
            handleClose={() => setShow(false)}
             modalTitle={'Add New Category'}
             onSubmit = {handleClose}
            >
            
            <Row>
                
                    <Input
                        value = {categoryName}
                        placeholder={`Category Name`}
                        onChange = {(e) => setCategoryName(e.target.value)}
                    ></Input>
                
            
                <Col>
                    <select className='form-control'
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>select category</option>
                            {
                                createCategoryList(category.categories).map(option => 
                                <option key={option.value} value={option.value}> {option.name}</option>
                                )
                            }
                    </select>
                </Col>

                <Col>
                    <Input type="file" name="categoryImage" onChange={handleCategoryImage}></Input>
                </Col>
            </Row>   
        </NewModal>            
        )
    }


    const deleteCategoryModal= () => {
        updateCheckAndExpanded();
        setDeleteCategory(true);
    }

    // delete category function
    const deleteCatFunc = () => {
      const checkedArrayId = checkedArray.map( (item,index) => ({_id: item.value}))
      const expandedArrayId = expandedArray.map( (item,index) => ({_id: item.value}));
      const ArrayIds = expandedArrayId.concat(checkedArrayId);

        if(checkedArrayId.length > 0){
            dispatch(deleteCatAction(checkedArrayId)).then(result => {
                if(result) {
                    dispatch(getAllCategory());
                    setDeleteCategory(false);
                }
            })
        }
        setDeleteCategory(false);
    }


    const renderDeleteModal = () => {

        return (
            <NewModal
            modalTitle="Confirm"
            show={deleteCategory}
            handleClose= {() => setDeleteCategory(false)}
            buttons = {[
                {
                    label: 'no',
                    color: 'primary',
                    onClick: () =>{ alert('no')}
                },
                {
                    label: 'yes',
                    color: 'danger',
                    onClick: deleteCatFunc
                }
            ]}
            >
              <h5>Expanded Categories Selected</h5>
              {
                expandedArray.map( (item,index) => <span key={index}>{item.name}</span>)
              }
              <h5>
              {checkedArray.map( (item,index) => <span key={index}>{item.name}</span>)}
              </h5>
            </NewModal>
        )
    }






    //------------------------------------------------------------------//


    // Display and use functions 
    return(
        <Layout sidebar>
          <Container>
            <Row>
                <Col md={12}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Category</h3>
                            <div className='actionBtnContainer'>
                                <button onClick={handleShow}> <IoIosAdd></IoIosAdd> <span>Add</span></button>
                                <button onClick={deleteCategoryModal}> <IoMdTrash></IoMdTrash> <span>Delete</span></button>
                                <button onClick={updateCategoryFunc}>  <IoMdCreate></IoMdCreate> <span>Edit</span></button>
                            </div>
                            
                        </div>


                </Col>
            </Row>
            <Row>
                <Col md={12}>
                            <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked( checked )}
                            onExpand={expanded => setExpanded( expanded )}
                            icons = {{
                                check: <IoIosCheckmarkCircle></IoIosCheckmarkCircle>,
                                uncheck: <IoIosCheckmarkCircleOutline></IoIosCheckmarkCircleOutline>,
                                halfCheck: <IoIosCheckmarkCircleOutline></IoIosCheckmarkCircleOutline>,
                                expandOpen: <IoMdArrowDown></IoMdArrowDown>,
                                expandClose: <IoMdArrowForward></IoMdArrowForward>
                            }}
                        />
                </Col>
            </Row>    
          </Container>

            {/* Add Categories Modal*/}
            {renderAddCategoriesModal()}

            {/* Update Categories Modal*/}
                {renderUpdateCategoriesModal()}

             {/* Delete Categories Modal*/}
             {renderDeleteModal()}

        </Layout>
        
    )
}

export default Category;