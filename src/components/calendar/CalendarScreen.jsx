import React, { useEffect, useState } from 'react'
import { NavBar } from '../ui/NavBar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar,momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/es';

import { messages } from '../../helpers/calendar-messages';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventSetActive, eventsStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const {events,activeEvent} = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
        
        dispatch(eventsStartLoading());

    }, [dispatch]);

    const onDoubleClick = (e) => {
        //console.log('abrir modal');
        
        dispatch(uiOpenModal());
        
    }

    const onSelectEvent = (e) => {

        dispatch(eventSetActive(e));
        
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActive());

    }
    
    const onViewChange =(e) => {
        setLastView(e);
        localStorage.setItem('lastView',e);
    }
    const {uid} = useSelector(state => state.auth)

    const eventStyleGetter = (event,start,end,isSeleted) => {
        //console.log(event.user._id);
        const {_id} = event.user; 

        const style = {
            backgroundColor:( uid === _id)? '#367CF7' :'#465660',
            borderRadius: '0px',
            opacity: '0.8',
            display:'block',
            color:'white',
            
        }

        return{
            style
        }
    };

    return (
        <div className="calendar-screen">

            <NavBar />  

            <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                onDoubleClickEvent={onDoubleClick}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                view={lastView}
                components = {{
                    event:CalendarEvent
                }} 
            />

            <AddNewFab />    
            {activeEvent && <DeleteEventFab /> } 
            <CalendarModal />
        </div>
    )
}
