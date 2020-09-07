import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import {Link,Switch} from 'react-router-dom';
import AddAssignment from './AddAssignment';
import Logout from './Logout';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
// import history from '../../history';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Dashboard extends Component{
  render(){
    const {classes}=this.props;
    return (
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Welcome Teacher
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
          <Link to="/teacher/add" >
              <ListItem>
                <ListItemIcon><AddCircleOutlineIcon /> </ListItemIcon>
                <ListItemText>Add Assignment</ListItemText>
              </ListItem>
              </Link>
          </List>
          <Divider />
          <List>
          <Link to="/teacher/logout" >
              <ListItem>
                <ListItemIcon><AddCircleOutlineIcon / > </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItem>
              </Link>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography>
        <Switch>
          <PrivateRoute exact path="/teacher/add" component={AddAssignment} />
          <PrivateRoute exact path="/teacher/logout" component={Logout} />
          </Switch>
        </Typography>
        <Typography>

        </Typography>
      </main>
      </div>
    );

  }
}

Dashboard.propTypes={
  classes:PropTypes.object.isRequired
}
export default withStyles(useStyles)(Dashboard);

// import React,{Component} from 'react';
// import {Link} from 'react-router-dom';
// import AddAssignment from './AddAssignment';

// class Dashboard extends Component{
//   render(){
//     return (
//       <>
//       <div>I am a dashboard component</div>
//       <Link to="/teacher/add">AddAssignment</Link>
//       </>
//     );
//   }
// }
// export default Dashboard;


