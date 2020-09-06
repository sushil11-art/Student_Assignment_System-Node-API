import React,{Component} from 'react';
import AddAssignment from './AddAssignment';
import {Link} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
class Dashboard extends Component{
  render(){
    return (
      <>
      <div>Dashboard
        <Link to ="/teacher/logout">
          Logout from here
        </Link>
      </div>
      <Link to="/teacher/add">Add assignment</Link>
      </>
    );

  }
}
export default Dashboard;

