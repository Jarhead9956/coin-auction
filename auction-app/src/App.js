import React, { useEffect, useState } from 'react'
import UserContext from './Context'
import getCookie from './utils/cookie'

const App = (props) => {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(null)

    const logIn = (user) => {
        setUser(user)
        setLoggedIn(true)
    }

    const logOut = () => {
        document.cookie = "x-auth-token=cookievalue; expires= Thu, 21 Aug 2014 20:00:00 UTC"
        setUser(null)
        setLoggedIn(false)
    }

    useEffect(() => {
        const token = getCookie('x-auth-token')

        if(!token) {
            logOut()
            return
        }

        fetch('http://localhost:9999/user/verify', {
            method: 'POST',
            body: JSON.stringify({
                token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            return promise.json()
        }).then(response => {
            if(response.status){
                logIn(response.user)
            }else{
                logOut()
            }
        })

        return(
            console.log('App')
        )
    }, [])

    if(loggedIn === null) {
        return <div>Loading...</div>
     }
     return(
         <UserContext.Provider value={{
             loggedIn,
             user,
             logIn,
             logOut 
         }}>
             {props.children}
         </UserContext.Provider>
     )
}

export default App