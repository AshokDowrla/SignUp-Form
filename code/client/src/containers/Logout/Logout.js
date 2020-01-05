import React, { Component } from 'react'
import { NavLink } from 'reactstrap'
import { bindActionCreators } from 'redux'
import {logout} from "../../store/actions/authActions"
import { connect } from 'react-redux'
class Logout extends Component {
    render() {
        return (
            <React.Fragment>
            
            <NavLink onClick={this.props.logout} href="/">Logout</NavLink>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps=(dispacth)=>{
    return bindActionCreators({logout}, dispacth)
}

export default connect(null,mapDispatchToProps)(Logout)