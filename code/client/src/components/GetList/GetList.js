import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getlist } from "../../store/actions/listActions"
class GetList extends Component {
    componentDidMount() {
        // if(!this.props.auth.isAuthenticated){

        // //console.log('in')
        //    this.props.history.push('/')

        // }
        this.props.getlist()
    }
    render() {
        const { list, isLoading } = this.props.list

        const pageBody = (isLoading) ? '' :

            (!list.users) ? 'No Registered Users' : (
                <React.Fragment>
                    <p>Total Registered Users : {list.count}</p>
                    <Table bordered >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Register Date(mm/dd/yy)</th>
                            </tr>
                        </thead>
                        {list.users.map((user, index) => {

                            const d = new Date(user.register_date)


                            return (<tbody key={user._id}>
                                <tr>
                                    <th scope="row">{index}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{d.toLocaleDateString()}</td>
                                </tr>


                            </tbody>)
                        }

                        )
                        }

                    </Table>

                </React.Fragment>
            )






        //console.log(list)
        return (
            <Container>

                {pageBody}



            </Container>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        list: state.list,

        auth: state.auth
    }

}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ getlist }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(GetList)