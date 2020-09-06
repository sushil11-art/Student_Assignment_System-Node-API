// import axios from 'axios';
import baseURL from '../api/baseURL';
import history from '../history';
import { GET_ERRORS, REGISTER_SUCCESS_TEACHER, LOGIN_TEACHER, SET_CURRENT_USER } from './type';
import setAuthToken from '../util/setAuthToken';
import jwt_decode from 'jwt-decode';


// export const registerTeacher=(userData)=>{
//     baseURL.post('/api/teacher/register',userData).then(result=>{
//         console.log(result);
//     }).catch(err=>{
//         console.log(err);
//     });
    
// }
export const registerTeacher=(userData)=>{
    return async (dispatch)=>{
        try{
        const response=await baseURL.post('/api/teacher/register',userData);
        dispatch({type:REGISTER_SUCCESS_TEACHER,payload:response.data})
        console.log(response);
        history.push('/');
        // console.log(response);
        }
        catch(error){
            dispatch({type:GET_ERRORS,payload:error.response.data})
        }
    };
};

export const loginTeacher=(userData)=>{
    return async (dispatch)=>{
        try{
            const response=await baseURL.post('/api/teacher/login',userData);
            // console.log(response);
            // const {token}=response.data;
            // console.log(response.data);
            //set token to local storage
            localStorage.setItem('jwtToken',response.data);
            //set token to auth header
            setAuthToken(response.data);
            const decoded=jwt_decode(response.data)
            console.log(decoded);
            //set the current user
            dispatch(setCurrentUser(decoded));
            history.push('/teacher/add');
        }
        catch(error){
            console.log(error.response)
            dispatch({type:GET_ERRORS,payload:error.response.data});
        }
    };
};

//dispacthing an action to reducer
export const setCurrentUser=(decoded_data)=>{
    return {
        type:SET_CURRENT_USER,
        payload:decoded_data
    };
};

export const logoutUser=()=>{
    return (dispatch)=>{
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch({});
    };
};