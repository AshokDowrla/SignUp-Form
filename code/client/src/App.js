import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { Route, Switch } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadUser } from "./store/actions/authActions"
import Home from './components/Home/Home';
import Login from './containers/Login/Login';
import SignUp from './containers/SignUp/SignUp';
import GetList from './components/GetList/GetList';
import AuthModal from './components/Authentication/AuthModal';
import { Spinner, Container } from 'reactstrap';
import MapView from './containers/MapView/MapView';

class App extends React.Component {

  state = {
    modal: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  componentDidMount() {

    
    //if (this.props.auth.isAuthenticated) {
    this.props.loadUser()



   // }
  }

  componentDidUpdate(prevProps) {

    const { isAuthenticated } = this.props.auth;
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }

  }

  render() {

    const { isLoading } = this.props.auth


    const pageBody = (isLoading) ? <Container className="text-center"><Spinner color="primary" /></Container> : (
      <React.Fragment>
        <NavBar auth={this.props.auth} toggle={this.toggle} />
        <AuthModal isOpen={this.state.modal} toggle={this.toggle} />
        <Switch>

          <Route exact path="/" component={(props) => <Home {...props} auth={this.props.auth} />} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          <Route path="/mapView" component={(props) => <MapView {...props} auth={this.props.auth} />} />
          <Route path="/getList"

            render={(props) => <GetList {...props} auth={this.props.auth} />}
          />
        </Switch>
      </React.Fragment>
    )

    return (
      <div className="App">



        {pageBody}

      </div>
    );




  }
}

const mapStateToProps = (state) => {
  return {

    auth: state.auth

  }
}


const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({ loadUser }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App)