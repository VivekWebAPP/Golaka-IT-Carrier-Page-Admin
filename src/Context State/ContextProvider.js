import React, { useEffect, useState } from 'react'
import Context from './ContextState'
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../redux';

const ContextProvider = (props) => {
    const [auth, setauth] = useState('');
    const users = useSelector((state)=>state.userResumeDownload);
    const dispatch = useDispatch();
    const token = localStorage.getItem('AuthToken');

    useEffect(()=>{
        if(token){
            dispatch(action.getAllUser(token));
        }
    },[users])

    return (
        <Context.Provider value={{ auth, setauth ,users}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
