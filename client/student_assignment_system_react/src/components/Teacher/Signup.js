import React,{Component} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';



import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
// react-router-dom
import {Link} from 'react-router-dom';

//action creator

import {connect} from 'react-redux';
import { registerTeacher } from '../../actions';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/" to="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errors: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
});

class Signup extends Component {
  state={
    name:'',
    email:'',
    password:'',

  }
  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  onSubmit=(e)=>{
    e.preventDefault();
    const teacherData={
      name:this.state.name,
      email:this.state.email,
      password:this.state.password
    }
    this.props.registerTeacher(teacherData); 
  }
   
    render(){
        const {classes}=this.props;
        const {name,email,password}=this.state;
        const {message}=this.props.errors;
        console.log(message);
       
    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
         {message ?<div className={classes.errors}><Alert severity="error">{message}</Alert></div> : null}
        <form className={classes.form} noValidate onSubmit={this.onSubmit}>

          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={this.onChange}
                value={name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.onChange}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.onChange}
                value={password}

              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link  to="/teacher/login" >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
  };
const mapStateToProps=(state)=>{
  return {errors:state.errors};
}
// export default withStyles(useStyles)(Signup);
export default connect(mapStateToProps,{registerTeacher})(withStyles(useStyles)(Signup));