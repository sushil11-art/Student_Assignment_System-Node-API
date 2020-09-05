
import React,{Component} from 'react';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PropTypes from 'prop-types';

import {Link,Switch,Route,BrowserRouter} from 'react-router-dom';
import Signup from './Signup';

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

class Teacher extends Component{
//   const classes = useStyles();

render(){
    const {classes}=this.props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
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
              <ListItem >
                <ListItemIcon> <InboxIcon /> </ListItemIcon>
                <ListItemText ><Link to="/teacher/signup">Sign Up</Link>
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemIcon> <InboxIcon /> </ListItemIcon>
                <ListItemText >Inbox</ListItemText>
              </ListItem>
              <ListItem >
                <ListItemIcon> <InboxIcon /> </ListItemIcon>
                <ListItemText >Inbox</ListItemText>
              </ListItem>
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography>
        <BrowserRouter>
        <Switch>
        <Route  exact path='/teacher' component={Signup} />

        <Route exact spath='/teacher/signup' component={Signup} />
        </Switch>
        </BrowserRouter>
        </Typography>
      </main>
    </div>
  );
}
}

Teacher.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(useStyles)(Teacher);