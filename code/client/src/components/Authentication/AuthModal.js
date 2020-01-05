import React from 'react'
import { ModalHeader, Modal, ModalBody, NavLink, Button, Row } from 'reactstrap'
import styles from "./AuthModal.module.scss"
const AuthModal = (props) => {

    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Need to Login or Sign Up</ModalHeader>
            <ModalBody>

               
                <Row>   <NavLink href='/login'>
                        <Button color="primary" outline className={styles.btn}>Login</Button>

                    </NavLink>
              
                <p className={styles.or}>or</p>
               <NavLink href="/register"><Button color="primary" outline className={styles.btn}>Sign Up</Button></NavLink>
               </Row>

            </ModalBody>

        </Modal>



    )
}


export default AuthModal