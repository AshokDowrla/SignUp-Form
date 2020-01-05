import React from 'react'
import { Container, Button, Row, Col, NavLink } from 'reactstrap'

import styles from "./Home.module.scss"



const Home =(props)=> {


       
        const { isAuthenticated, user } = props.auth
        //console.log(user)
        const homeDisplay = (
            <React.Fragment>
                <Col className={styles.loginbtn} md="5">
                    <NavLink href='/login'>
                        <Button color="primary" outline className={styles.btn}>Login</Button>

                    </NavLink>
                </Col>
                <p className={styles.or}>or</p>
                <Col className={styles.signupbtn} md="5"> <NavLink href="/register"><Button color="primary" outline className={styles.btn}>Sign Up</Button></NavLink></Col>

            </React.Fragment>


        )

        const nameDisplay = (<span><strong>{user ? user.name : ''}</strong></span>)
        return (
            <Container className="mt-auto mb-auto">

                <Row className={styles.heading} >Welcome To HomePage</Row>
                <Row className="justify-content-center">

                    {isAuthenticated ? nameDisplay : homeDisplay}
                </Row>

            </Container>
        )
    }






export default (Home);
