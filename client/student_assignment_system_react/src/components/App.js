import React from 'react';

import Landing from './layouts/Landing';


import {Router,Switch,Route} from 'react-router-dom'
import Signup from './Teacher/Signup';
import history from '../history';
import Login from './Teacher/Login';
import store from '../store';
import {Provider} from 'react-redux';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Dashboard from './Teacher/index';
// import AddAssignment from './Teacher/AddAssignment';
// import Logout from './Teacher/Logout';
import setAuthToken from '../util/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from '../actions';

// if (localStorage.jwtToken){
// 	const token=localStorage.jwtToken;
// 	setAuthToken(token);
// 	const decoded=jwt_decode(token);
// 	store.dispatch(setCurrentUser(decoded));
// 	const currentTime=Date.now() / 1000;
// 	if (decoded.expiresIn < currentTime ){
// 		store.dispatch(logoutUser());
// 		window.location.href="./teacher/add";
// 	}
// }


class App extends React.Component{
	render(){
		return (
			<Provider store={store}>
			<Router history={history}>
			<div className="conatiner">
			<Switch>
			<Route exact path='/' component={Landing} />
			<Route exact path="/teacher" component={Signup} />
			<Route exact path="/teacher/login" component={Login} />
			{/* Private route for teacher */}
			<PrivateRoute>
			<Dashboard />
			</PrivateRoute>
			</Switch>
			</div>
			</Router>
			</Provider>
			);
	}

}
export default App;

