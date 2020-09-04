import React from 'react';

import Landing from './layouts/Landing';

import Teacher from './Teacher/index';

// import Admin from './layouts/Admin';


import {BrowserRouter,Switch,Route} from 'react-router-dom'


class App extends React.Component{
	render(){
		return (
			<BrowserRouter>
			<div className="conatiner">
			<Landing />
			<Switch>
			<Route exact path="/teacher" component={Teacher} />
			<Route exact path="/teacher" component={Teacher} />

			</Switch>
			</div>
			</BrowserRouter>
			);
	}

}
export default App;

