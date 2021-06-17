import React, {useContext} from 'react'
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'
import HomePage from './pages/homePage'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import CreateCoin from './pages/create-coin'
import DetailCoin from './pages/coin-details'
import ProfilePage from './pages/profile'
import EditCoin from './pages/edit-coin'
import UserContext from './Context'

const Navigation = () => {
    const {
        loggedIn,
        user
    } = useContext(UserContext)

    const context = useContext(UserContext)

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/register' component={!loggedIn ? (RegisterPage) : (HomePage)} />
                <Route path='/login' component={!loggedIn ? (LoginPage) : (HomePage)} />
                <Route path='/create' component={loggedIn ? (CreateCoin) : (LoginPage)} />
                <Route exact path='/details/:coinid' component={loggedIn ? (DetailCoin) : (LoginPage)} />
                <Route path='/details/edit/:coinid' component={loggedIn ? (EditCoin) : (LoginPage)} />
                <Route path='/profile/:userid' component={loggedIn ? (ProfilePage) : (LoginPage)} />
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation