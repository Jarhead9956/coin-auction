import React, { Component, useContext, useState } from 'react'
import SubmitButton from '../../Components/buttons/submit-button'
import Input from '../../Components/input'
import UserContext from '../../Context'
import styles from './index.module.css'

import 'antd/dist/antd.css'
import HeaderNav from '../../Components/header'
import FooterNav from '../../Components/footer'
import { Layout } from 'antd'

const { Content } = Layout

const LoginPage = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)
    const context = useContext(UserContext)

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('http://localhost:9999/user/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            const authToken = promise.headers.get('Autorization')
            if(authToken) {
                document.cookie = `x-auth-token=${authToken}`
            }
            return promise.json()
        }).then(data => {

            if(data.username && document.cookie){
                context.logIn(data)
                props.history.push('/')
            }
        }).catch(e => {
            setLoginError(true)
        })
    }

    return(
        <Layout className= 'layout'>
            <HeaderNav />
            <Content>
                <div className="site-layout-content" style={{textAlign:"center"}}>
                    <h1>Login page</h1>
                    <div>
                        <form className={styles.container} onSubmit={handleSubmit}>
                            <Input 
                                label='Username' 
                                value={ username }
                                onChange={(e) => setUsername(e.target.value)} 
                                id='username'>
                            </Input>
                            <Input 
                                type="password"
                                label='Password' 
                                value={ password } 
                                onChange={(e) => setPassword(e.target.value)} 
                                id='password'>
                            </Input>
                            {loginError ? (<div>Wrong username or password</div>) : null}
                            <SubmitButton type="submit" title='Login' />
                        </form> 
                    </div>
                        
                </div>
            </Content>
            <FooterNav />
        </Layout>
    )    
 }

export default LoginPage