import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addAddress } from '../../actions';
import { MaterialButton, MaterialInput } from '../../components/MaterialUI/material';
import './checkout.css'

const  AddressForm = (props) => {

    const {initialData} = props;

    const [name, setName] = useState(initialData ? initialData.name :'');
    const [mobileNumber, setMobileNumber] = useState(initialData ? initialData.mobileNumber :'');
    const [pinCode, setPinCode] = useState(initialData ? initialData.pinCode :'');
    const [address, setAddress] = useState(initialData ? initialData.address :'');
    const [city, setCity] = useState(initialData ? initialData.city :'');
    const [state, setState] = useState(initialData ? initialData.state :'');
    const [addressType, setAddressType] = useState(initialData ? initialData.addressType :'');
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [id, setId] = useState(initialData ? initialData._id : "")

    const inputContainer = {
        width: '100%',
        marginRight: '10px',
        padding: '10px 10px',
        paddingLeft: '15px'
        
    }

    const onAddressSubmit = (e) => {
        const payload = {
            address: {
                name,
                mobileNumber,
                pinCode,
                address,
                city,
                state,
                addressType
            }
        }
        console.log(payload);
        if(id) {
            payload.address._id = id;
        }
        dispatch(addAddress(payload))
        setSubmitFlag(true);
    }

    useEffect( () => {
        console.log("addressCount", user.address);
        if(submitFlag) {
            console.log("where are we", user);
            let _address = {};
            if(id){
                _address = {
                    _id: id,
                    name,
                    mobileNumber,
                    pinCode,
                    address,
                    city,
                    state,
                    addressType
                };
            }else {
                _address = user.address.slice(user.address.length - 1[0])
            }
            props.onSubmitForm(_address);
        }
    }, [user.address])

    return (
        <div className='checkoutStep'>
            <div className={`checkoutHeader`}>
                <div>
                    <span className='stepNumber'>+</span>
                    <span className='stepTitle'>{`Add New Address`}</span>
                </div>
            </div>
            <div className='Container'>

                <div className='flexRow'>
                    <div style={inputContainer}>
                        <MaterialInput
                        label= "Name"
                        value= {name}
                        onChange = {(e) => setName(e.target.value)}
                        ></MaterialInput>
                    </div>
                    <div style={inputContainer}>
                        <MaterialInput
                        label= "10-digit Phone Number"
                        value= {mobileNumber}
                        onChange = {(e) => setMobileNumber(e.target.value)}
                        ></MaterialInput>
                    </div>
                </div>

                <div className='flexRow'>
                    <div style={inputContainer}>
                        <MaterialInput
                        label= "Address"
                        value= {address}
                        onChange = {(e) => setAddress(e.target.value)}
                        ></MaterialInput>
                    </div>
                    <div style={inputContainer}>
                        <MaterialInput
                        label= "City"
                        value= {city}
                        onChange = {(e) => setCity(e.target.value)}
                        ></MaterialInput>
                    </div>
                </div>

                <div className='flexRow'>
                    <div style={inputContainer}>
                        <MaterialInput
                        label= "Pin"
                        value= {pinCode}
                        onChange = {(e) => setPinCode(e.target.value)}
                        ></MaterialInput>
                    </div>
                    <div style={inputContainer}>
                        <MaterialInput
                        label= "State"
                        value= {state}
                        onChange = {(e) => setState(e.target.value)}
                        ></MaterialInput>
                    </div>
                </div>

                <div>
                    <label> Address Type</label>
                    <div className='flexRow'>
                        <div>
                            <input type="radio" onClick={ () => setAddressType('home')} name='addressType' />
                            <span>Home</span>
                        </div>
                        <div>
                            <input type="radio" onClick={ () => setAddressType('Work')} name='addressType' />
                            <span>Work</span>
                        </div>
                    </div>
                </div>


                <div className="flexRow">
                    <MaterialButton
                    title="Save And Deliver Here"
                    onClick= {onAddressSubmit}
                    ></MaterialButton>
                </div>


            </div>
        </div>
    )
}

export default AddressForm