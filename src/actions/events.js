import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvetns } from "../helpers/prepare-events";
import { types } from "../types/types";


export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {

        const { uid, name } = getState().auth;
        
        try {

            const resp = await fetchConToken('events',event,'POST');
            const body = await resp.json();

            if(body.ok){
                
                event.id = body.evento.id;
                event.user = {
                    _id:uid,
                    name:name
                };
                dispatch(eventAddNew(event));
               
            }

        } catch (error) {
            
            console.log(error);

        }

    }
}

const eventAddNew = (event) => ({
    type:types.eventAddNew,
    payload:event
});

export const eventSetActive = (event) => ({
    type:types.eventSetActive,
    payload:event
});

export const eventClearActive = () => ({
    type:types.eventClearActive
});


export const eventStartUpdate = (event) => {
    return async(dispatch) => {

        try {

            //console.log(event);
            const resp = await fetchConToken(`events/${event.id}`,event,'PUT');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventUpdated(event));
            }else{
                Swal.fire('Error',body.msg,'error');
            }

        } catch (error) {
            console.log(error);
        }

    }
}



const eventUpdated = (event) => ({
    type:types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => {
    return async (dispatch, getState) => {

        const {id} = getState().calendar.activeEvent;
        //console.log(activeEvent);
        try {
            const resp = await fetchConToken(`events/${id}`,{},'DELETE');
            const body = await resp.json();
            if(body.ok){
                dispatch(eventDeleted());
            }else{
                Swal.fire('Error',body.msg,'error');
            }
            

        } catch (error) {
            console.log(error);
        }

    }
}


const eventDeleted = () => ({
    type:types.eventDeleted

});

export const eventsStartLoading = () => {
    return async(dispatch) => {

        try {

            const resp = await fetchConToken('events' );
            const body = await resp.json();

            const eventos = prepareEvetns(body.evetos);
            
            if(body.ok){
                //console.log(body.evetos);
                dispatch(eventsLoaded(eventos));
            }


        } catch (error) {
            console.log(error);
        }

    }
}

const eventsLoaded = (events) => ({
    type:types.eventLoaded,
    payload:events
});

export const eventClearState = () => ({
    type:types.eventClearState
});