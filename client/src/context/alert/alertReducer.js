import {SET_ALERT,REMOVE_ALERT} from '../types';
export default (state,action)=>{
    switch(action.type){
        case SET_ALERT:
            state.alert.push(action.payload)
            return {
                ...state
            }
       
         case REMOVE_ALERT:
            for(let i=0;i<state.alert.length;i++){
                if(state.alert[i].id===action.payload){
                    state.alert.splice(i,1);
                }
            }
            
            return {
                ...state
            }
        default:
            return state;
    }
}