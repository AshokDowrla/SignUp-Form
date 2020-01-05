import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Card, CardBody, CardTitle, Button, NavLink, Alert, FormFeedback } from 'reactstrap'
import styles from "./SignUp.module.scss"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { register } from "../../store/actions/authActions"
import { clearErrors } from "../../store/actions/errorActions"
class SignUp extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        msg: null,

        formErrors: {
            name: {
                msg: '',
                valid: null,


            },
            email: {
                msg: '',
               

                valid: null,


            },
            password: {
                msg: '',
                valid: null,


            },
        }
    };

    formValid = (formErrors) => {

        let valid = true
        Object.values(formErrors).forEach(val => {
           
            if(val.msg.length>0){
                valid=false
            }
            
        })

        return valid
    }
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        if (error !== prevProps.error) {


            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }


        }

        //console.log(this.state.success)



        if (isAuthenticated) {

            this.onSucess()

        }




    }



    onSucess = () => {
        this.props.clearErrors()


        this.props.history.push('/')
    }


    isUpperrCase = (str) => RegExp(/[A-Z]+/).test(str)

    isSpecial = (str) => {
        return RegExp(/[.!@#$%&’*()+/=?^_`{|}~-]+/).test(str);
    }

    isNumeric = (str) => RegExp(/[0-9]+/).test(str)

    isLowerCase = (str) => !RegExp(/[^a-z0-9_]/).test(str)

    containsSpace = (str) => RegExp(/\s/g).test(str)

    onChange = (e) => {


        this.setState({
            [e.target.name]: e.target.value
        });

        const { name, value } = e.target
        const { formErrors } = this.state
        let msg, valid;
        switch (name) {
            case "name":


                msg = ""

                const low = "only lowercase letters, numbers and underscore are allowed\n"
                const strLen = "minimum 5 characters required\n"
                const space = "tabs,spaces or newline not alllowed\n"
                if (value.length < 5) {
                    msg = msg + strLen
                }
                if (!this.isLowerCase(value)) {

                    msg = msg + low
                }

                if (this.containsSpace(value)) {
                    msg = space
                }

                if (msg.length) {
                    valid = false
                }
                else {
                    valid = !(value.length < 5)
                }

                this.setState({
                    formErrors: {
                        ...formErrors,
                        name: {
                            ...formErrors.name,
                            msg: msg,
                            valid: valid,


                        }
                    }
                })
                break;
            case "password":


                const len = "minimum 8 characters required\n"
                const cap = "Contains atleast 1 capital letter\n"
                const spc = "Contains atleast 1 special character\n"
                const num = "Contains atleast 1 number\n"

                const tab = "tabs,spaces or newline not alllowed\n"
                msg = ""



                if (value.length < 8) {
                    msg = msg + len
                }
                if (!this.isUpperrCase(value)) {

                    // console.log("upper")
                    msg = msg +cap

                    

                }

                if (!this.isNumeric(value)) {

                    msg = msg + num
                }
                if (!this.isSpecial(value)) {
                    msg = msg + spc
                }

                if (this.containsSpace(value)) {
                    msg = tab
                }
                if (msg.length) {
                    valid = false
                }
                else {
                    valid = !(value.length < 8)
                }





                this.setState({
                    formErrors: {
                        ...formErrors,
                        password: {
                            ...formErrors.password,
                            msg: msg,
                            valid: valid,


                        }
                    }
                })

                break;
            case "email":
                const emailRegex = !RegExp(/([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?/).test(value)

                msg = (!emailRegex) ? "" : "Invalid email address"

                if (msg.length) {
                    valid = false
                }
                else {
                    valid = true
                }


                this.setState({
                    formErrors: {
                        ...formErrors,
                        email: {
                            ...formErrors.email,
                            msg: msg,
                            valid: valid,


                        }
                    }
                })

                break;
            default:
                break;
        }



        // console.log(this.state)
    }

    onSubmit = (e) => {

     
        const { name, email, password } = this.state;


       
        if (this.formValid(this.state.formErrors)) {
            //console.log("valid")
            const newUser = {
                name,
                email,
                password
            };
            //console.log(e.target)

            this.props.register(newUser);
        }





    }


    render() {
        const { formErrors } = this.state

        return (
            <Card className={styles.Card}>
                <CardTitle className={styles.cardTitle}>Register</CardTitle>
                {this.state.msg ? (
                    <Alert color='danger' className={styles.Alert}>{this.state.msg}</Alert>
                ) : null}
                <CardBody>

                    <Form onSubmit={(e) => this.onSubmit(e)} onKeyPress={e => {
                        if (e.key === "Enter") {
                            this.onSubmit()
                        }
                    }} >
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email Address" className="mb-3"
                                onChange={(e) => this.onChange(e)} autoComplete="off" maxLength="25"
                                valid={(formErrors.email.valid === null) ? null : formErrors.email.valid}
                                invalid={(formErrors.email.valid === null) ? null : !formErrors.email.valid}
                            />
                            {formErrors.email.msg.length > 0 &&
                                <FormFeedback >{formErrors.email.msg.split('\n').map((para,index)=><div key={index}>{para}</div>)}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Username</Label>
                            <Input type="name" name="name" id="name" placeholder="User Name" className="mb-3" autoComplete="off" maxLength="12"
                                onChange={(e) => this.onChange(e)} invalid={(formErrors.name.valid === null) ? null : !formErrors.name.valid}
                                valid={(formErrors.name.valid === null) ? null : formErrors.name.valid}
                            />
                            {formErrors.name.msg.length > 0 &&
                                <FormFeedback >{formErrors.name.msg.split('\n').map((para,index)=><div key={index}>{para}</div>)}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" className="mb-3" maxLength="16"
                                onChange={(e) => this.onChange(e)} invalid={(formErrors.password.valid === null) ? null : !formErrors.password.valid}
                                valid={(formErrors.password.valid === null) ? null : formErrors.password.valid} autoComplete="off"
                            />
                            {formErrors.password.msg.length > 0 &&
                                <FormFeedback >{formErrors.password.msg.split('\n').map((para,index)=><div key={index}>{para}</div>)} </FormFeedback>}
                        </FormGroup>
                        <Button color='dark' style={{ marginTop: '2rem' }} block onClick={(e) => this.onSubmit(e)}>
                            Register
                          </Button>

                        <p className="mt-2 text-right d-flex">Have an Account? <NavLink href="/login" className="m-0 ml-2 p-0">Login</NavLink></p>



                    </Form>
                </CardBody>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ register, clearErrors }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)