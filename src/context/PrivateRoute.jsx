import {useContext} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from './AuthContext'

const PrivateRoute = () => {
    let {authToken} = useContext(AuthContext)
    return(
        authToken ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute