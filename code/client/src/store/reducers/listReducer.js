import { GET_LIST } from "../actions/types"



const initialState={
    list:null,
    isLoading:true
}

const listReducer =(state=initialState, action) =>{
    switch(action.type){


        case GET_LIST:
           // console.log(action.payload)
            return{
                ...state,
                list:action.payload,
                isLoading:false

            }

        default:
            return state
    }

}

export default listReducer