
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

//export const PublicRoutes = ({exact,isLoggedIn,component:Component,path}) => {
    //en rest se guarda el resto de props osea, exact y path que mandamos de approuter
export const PublicRoutes = ({isLoggedIn,component:Component,...rest}) => {
    return (
        <Route {...rest}
            component={(props) => (
                (!isLoggedIn)?
                <Component {...props}/>
                :<Redirect to="/"/>
            )}
        />

    )
}

PublicRoutes.propTypes = {
    isLoggedIn:PropTypes.bool.isRequired,
    component:PropTypes.func.isRequired
}

