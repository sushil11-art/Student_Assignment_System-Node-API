// import React,{Component} from 'react';
// // import Typography from '@material-ui/core/Typography';

// class AddAssignment extends Component{
//   render(){
//     return (
//           <form>
//           <input type="text"></input>
//           <input type="text"></input>
//         </form>
    
//     )
//   }
// }
// export default AddAssignment;

import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { addAssignment } from '../../actions';
import Alert from '@material-ui/lab/Alert';




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  selectField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
})


const departments = [
  {
    value: 'IT',
    label: 'IT',
  },
  {
    value: 'SOFTWARE',
    label: 'SOFTWARE',
  },
  {
    value: 'COMPUTER',
    label: 'COMPUTER',
  },
  {
    value: 'CIVIL',
    label: 'CIVIL',
  },
];
const semesters = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '5',
  },
  {
    value: '5',
    label: '5',
  },
  {
    value: '6',
    label: '6',
  },
   {
    value: '7',
    label: '7',
  }, 
  {
    value: '8',
    label: '8',
  }
];

const shifts=[
  {
    value:'Day',
    label:'Day'
  },
  {
    value:'Morning',
    label:'Morning'
  }
]



class AddAssignment extends Component{
  
  state={

    name:'',
    subject:'',
    department:'',
    semester:'',
    shift:'',
    selectedFile:''

  }
  
  onNameChange=(e)=>{
    this.setState({name:e.target.value});
  }
  onSubjectChange=(e)=>{
    this.setState({subject:e.target.value});
  }
  onDepartmentChange=(e)=>{
    this.setState({department:e.target.value});
  }
  onSemesterChange=(e)=>{
    this.setState({semester:e.target.value});
  }
  onShiftChange=(e)=>{
    this.setState({shift:e.target.value});
  }
  onFileChange=(e)=>{
    this.setState({selectedFile:e.target.files[0]});
    console.log(this.state.selectedFile);
  }
  onSubmit=(e)=>{
    e.preventDefault();
    console.log(this.state.selectedFile);
    const {name,subject,departmanet,semester,shift,selectedFile}=this.state;
    let formData=new FormData();
    formData.append('name',name);
    formData.append('subject',subject);
    formData.append('department',departmanet);
    formData.append('semester',semester);
    formData.append('shift',shift);
    formData.append('selectedFile',selectedFile);
   
    this.props.addAssignment(formData);

  }
  render(){
  
  const {classes}=this.props;
  const {name,subject,department,semester,shift}=this.state;
  // const {message}=this.props.errors;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleOutlineIcon />
        </Avatar>
        {/* {message ?<div className={classes.errors}><Alert severity="error">{message}</Alert></div> : null} */}

          <Typography component="h1" variant="h5">
            Add Assignment
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={this.onNameChange}
                value={name}
              />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="subject"
              label="Subject"
              name="subject"
              autoComplete="subject"
              autoFocus
              onChange={this.onSubjectChange}
              value={subject}
            />
             <TextField
            id="standard-select-department"
            select
            fullWidth
            name="department"
            label="Select"
            value={department}
            onChange={this.onDepartmentChange}
            helperText="Please select department"
              >
          {departments.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
            id="standard-select-semester"
            select
            fullWidth
            label="Select"
            name="semester"
            value={semester}
            onChange={this.onSemesterChange}
            helperText="Please select semester"
              >
          {semesters.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
            id="standard-select-shift"
            select
            fullWidth
            label="Select"
            name="shift"
            value={shift}
            onChange={this.onShiftChange}
            helperText="Please select shift"
              >
          {shifts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="selectedFile"
              // value={selectedFile}
              // label="Assignment File"
              type="file"
              id="selectedFile"
              onChange={this.onFileChange}
              autoComplete="selectedFile"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}

            >
              Upload
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
}

const mapStateToProps=(state)=>{
  return null
    // errors:state.errors
}

export default connect(null,{addAssignment})(withStyles(useStyles)(AddAssignment));