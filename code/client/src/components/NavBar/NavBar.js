import React from 'react'

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

import styles from "./NavBar.module.scss"
import Logout from '../../containers/Logout/Logout'
const NavBar = (props) => {






    const { isAuthenticated, user } = props.auth;

    const loggIn = (
        <React.Fragment>
            <NavItem>
                <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/register">Sign Up</NavLink>
            </NavItem>
        </React.Fragment>
    )

    const loggOut = (
        <React.Fragment>
            <NavItem>
                <span className='navbar-text mr-3'>
                    <strong>{user ? `Welcome ${user.name}` : ''}</strong>

                </span>
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>
        </React.Fragment>
    )

    const listLink = (isAuthenticated) ? '/getList' : null
    const mapLink = (isAuthenticated) ? '/mapView' : null

    

    return (

        <React.Fragment>



            <Navbar expand="md" className={styles.navigationBar}  >
                <NavbarBrand href="/">UserList</NavbarBrand>
                <Nav navbar className="mr-auto ml-auto ">
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={props.toggle} href={listLink} className={styles.links}  >List of users</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={props.toggle} href={mapLink} className={styles.links}>Map View</NavLink>
                    </NavItem>

                </Nav>
                <Nav>
                    {isAuthenticated ? loggOut : loggIn}

                </Nav>


            </Navbar>

        </React.Fragment>


    )
}





export default (NavBar);