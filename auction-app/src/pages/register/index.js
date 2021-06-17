import React, { useContext, useState } from 'react'
//import PageLayout from '../../components/page-layout'
//import Title from '../../components/title'
import SubmitButton from '../../Components/buttons/submit-button'
import Input from '../../Components/input'
import styles from './index.module.css'
import UserContext from '../../Context'


import 'antd/dist/antd.css'
import HeaderNav from '../../Components/header'
import FooterNav from '../../Components/footer'
import { Layout } from 'antd'

const { Content } = Layout


const RegisterPage = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [registerError, setRegisterError] = useState(false)
    const context = useContext(UserContext)

    const handleSubmit = (event) => {
        event.preventDefault()

        if((password.length < 1) || (repeatPassword.length < 1) || (password !== repeatPassword)){
            setRegisterError(true)
            return
        }

        fetch('http://localhost:9999/user/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            const authToken = promise.headers.get('Autorization')
            if(authToken){
                document.cookie = `x-auth-token=${authToken}`
            }
            return promise.json()
        }).then(data => {
            if(data.username && document.cookie){
                context.logIn(data)
                props.history.push('/')
            }
        }).catch(e => {
            setRegisterError(true)
        })
    }

    return(
        <Layout className= 'layout'>
        <HeaderNav />
        <Content>
            <div className="site-layout-content" style={{textAlign:"center"}}>
                <h1>SOME CONTENT</h1>
                <div>
                    <form className={styles.container} onSubmit={handleSubmit}>
                        {/* <Title title='Register page' /> */}
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
                        <Input 
                            type="password"
                            label='Re-password' 
                            value={ repeatPassword }
                            onChange={(e) => setRepeatPassword(e.target.value)} 
                            id='re-password'>
                        </Input>
                        {registerError ? (<div>Password and Repeat passsword don't match!</div>) : null}
                        <SubmitButton type='submit' title='Register' />
                    </form> 
                </div>
                
            </div>
        </Content>
        <FooterNav />
    </Layout>
    )    

}

export default RegisterPage