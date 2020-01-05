
import { GET_MARKERS, GET_FILTER_MARKER } from "../actions/types"
import {Places} from "../../data/places"


const initialState = {
    mapMarkers:null,

    localMarkers:null
    


}

const filter=(markers, color) =>{
  
    const newMarker=markers.filter(marker=>
       
        (marker.marker=== color)
          
    
    
    )

    //console.log(newMarker)
    return newMarker
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MARKERS:
         
        
            return {
                ...state,
                mapMarkers:Places,
                localMarkers:Places

            }

        case GET_FILTER_MARKER:
           let {mapMarkers} =state
              const newMarker=filter(mapMarkers, action.payload)
           
              return {
                  ...state,
                  localMarkers:newMarker
              }


        default:
            return state
    }

}

export default mapReducer