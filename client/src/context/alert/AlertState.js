import React,{useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertReducer from './alertReducer';
import AlertContext from './alertContext';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';
const AlertState = (props) => {
    const initialState={
        alert:[]
    }
    const [state,dispatch]=useReducer(AlertReducer,initialState);

    //set alert
    const setAlert=(msg,type)=>{
        const id=uuidv4();
        dispatch({
            type:SET_ALERT,
            payload:{msg:msg,type:type,id:id}
        });
        setTimeout(()=>{
            dispatch({
                type:REMOVE_ALERT,
                payload:id
            })

        },3000)
    }
   

    return (
        <AlertContext.Provider
            value={{
                alert:state.alert,
                setAlert
            }}
        >
        {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;
