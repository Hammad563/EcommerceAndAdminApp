

import React, { Fragment } from 'react'
import NavBar from '../Header/navbar'
import Menu from '../MenuHeader/menu'

const Layout = (props) => {
    return (
        <Fragment>
            <NavBar></NavBar>
            <Menu></Menu>
            {props.children}
        </Fragment>
    )
}

export default Layout
