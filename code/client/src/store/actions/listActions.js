import { GET_LIST } from "./types";
import { returnErrors } from "./errorActions";

import axios from "axios"
import {tokenConfig} from './authActions'

export const getlist =()=>(dispatch, getState)=>{
    axios.get('/form/list', tokenConfig(getState))

    .then(res=>dispatch({
        type:GET_LIST,
        payload:res.data
    }))
    .catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status));

    })
}