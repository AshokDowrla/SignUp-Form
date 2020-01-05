import { GET_MARKERS, GET_FILTER_MARKER } from "./types"



export const getMarkers = () => {

    return {
        type: GET_MARKERS,

    }
}

// export const popUp =() =>{
//     return{
//         type:POPUP_IMG
//     }
// }

export const filterMarkers = (color) => {
    
    return { type: GET_FILTER_MARKER, payload: color }
}