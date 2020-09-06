import React,{Component} from 'react';
// material ui 
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
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { loginTeacher } from '../../actions';
//styles with material ui
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

class Login extends Component{
    state={
        email:'',
        password:'',
    }
    onChange=(e)=>{

        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit=(e)=>{
        e.preventDefault();
        // console.log(this.email);
        const teacherData={
            email:this.state.email,
            password:this.state.password
        }
        this.props.loginTeacher(teacherData);

    }

    render(){
        const {classes}=this.props;
        const {email,password}=this.state;
        const { message }=this.props.errors;
        // console.log(message);
       
        // const {message}=this.props.errors;
        return (
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {message ?<div className={classes.errors}><Alert severity="error">{message}</Alert></div> : null}
        <form className={classes.form} noValidate onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
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
            onSubmit={this.onSubmit}
          >
            Login 
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link  to="/" >
                  Go to home page..
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


Login.propTyoes={
    classes:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>{
  return {errors:state.errors};
}

export default connect(mapStateToProps,{loginTeacher})(withStyles(useStyles)(Login));

