import React from 'react';
import {Form, Button,Row, Col, Container} from 'react-bootstrap';

export default function Input(props) {

    let input = null;
    switch(props.type){
        
        case 'select':
            input =
                    <Form.Group className="mb-3" >
                    <Form.Label>{props.label}</Form.Label>
                            <select
                            className="form-control form-control-sm"
                            value={props.value}
                            onChange={props.onChange}
                            >
                                <option value="">{props.placeholder}</option>
                                {
                                    props.options.length > 0 ? 
                                    props.options.map( (option, index) => <option key={index} value={option._id}>{option.name}</option>  )
                                    : null
                                }
                            </select>
                    </Form.Group>
            break;
        case 'text':
        default:
            input =
                    <Form.Group className="mb-3" >
                    <Form.Label>{props.label}</Form.Label>
                    <Form.Control type={props.type} placeholder={props.placeholder}
                    value = {props.value}
                    onChange = {props.onChange}
                    />
                    <Form.Text className="text-muted">
                        {props.ErrorMessage}
                    </Form.Text>
                    </Form.Group>
    }

    
    return input;
}
