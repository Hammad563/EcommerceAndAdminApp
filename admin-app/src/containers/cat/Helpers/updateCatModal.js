import React from 'react';
import Input from '../../../components/UI/Input/Input';
import NewModal from '../../../components/UI/Input/modal';
import { Container, Row, Col, Button} from 'react-bootstrap';


const updateCatModal = (props) => {

    const {
        show,
        size,
        handleClose,
        modalTitle,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList
        } = props;
    return(
        <NewModal 
            show={show} 
            handleClose={handleClose} 
            modalTitle={modalTitle}
            size = {size}
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
                                                    categoryList.map(option => 
                                                    <option key={option.value} value={option.value}> {option.name}</option>
                                                    )
                                                }
                                    </select>
                                </Col>

                                <Col>
                                    <select className='form-control'>
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
                                                   categoryList.map(option => 
                                                    <option key={option.value} value={option.value}> {option.name}</option>
                                                    )
                                                }
                                    </select>
                                </Col>

                                <Col>
                                    <select className='form-control'>
                                        <option >Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    }            
                        {/*<Input type="file" name="categoryImage" onChange={handleCategoryImage}></Input>*/}
                </NewModal>
    )
}

export default updateCatModal;