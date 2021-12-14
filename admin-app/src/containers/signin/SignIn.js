import React from 'react'
import Layout from '../../components/Layout/Layout';
import {Form, Button,Row, Col, Container} from 'react-bootstrap';
import Input from '../../components/UI/Input/Input';
import {login, isUserLogginIn} from '../../actions';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';


export default function SignIn() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    

    const userLogin = (e) => {
        
       e.preventDefault();

        const user = {
            email, password
            }
            dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={`/`}></Redirect>
    }

    

    return (
        <div>
            <Layout>
                <Container>
                <Row style={{marginTop: '70px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit = { userLogin}>
                                <Input
                                    label = "Email"
                                    placeholder = "Email"
                                    Value = {email}
                                    Type = "email"
                                    onChange = { (e) => setEmail(e.target.value)}
                                   >
                                </Input>
                                
                                <Input
                                    label = "Password"
                                    placeholder = "Password"
                                    Value = {password}
                                    Type = "password"
                                    onChange = { (e) => setPassword(e.target.value)}
                                    >
                                </Input>



                            <Button variant="primary" type="submit">
                                Submit
                            </Button>


                        </Form>
                     </Col>
                </Row>
                </Container>
        </Layout>
    </div>
    )
}
