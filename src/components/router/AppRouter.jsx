import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { startChecking } from '../../actions/auth';

import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const {checking, uid} = useSelector(state => state.auth);

    useEffect(() => {

        dispatch(startChecking());

    }, [dispatch]);

    if(checking){
        return <h5>Espere...</h5>
    }

    return (
        <Router>
              

            <div>

                <Switch>

                    <PublicRoutes 
                        exact
                        path='/login'
                        component={LoginScreen} 
                        isLoggedIn={ !! uid }
                    />

                    <PrivateRoutes 
                        path='/'
                        exact
                        component={CalendarScreen}
                        isLoggedIn={ !! uid }
                    />
                    <Redirect to='/'/>

                </Switch>
            </div>
        </Router>


    )
}
