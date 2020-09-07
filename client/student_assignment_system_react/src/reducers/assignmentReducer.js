import { ADD_ASSIGNMENT } from "../actions/type";


export default (state={},action)=>{
    switch(action.type){
        case ADD_ASSIGNMENT:
            return {...state,[action.payload._id]:action.payload}
        default:
            return state;
    }

}