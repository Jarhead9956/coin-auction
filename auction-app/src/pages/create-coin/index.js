import React, { useContext, useState } from 'react'
import SubmitButton from '../../Components/buttons/submit-button'
import Input from '../../Components/input'
import styles from './index.module.css'
import UserContext from '../../Context'
import getCookie from '../../utils/cookie'


import 'antd/dist/antd.css'
import HeaderNav from '../../Components/header'
import FooterNav from '../../Components/footer'
import { Layout } from 'antd'

const { Content } = Layout


const CreateCoin = (props) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const context = useContext(UserContext)

    const handleSubmit = (event) => {
        event.preventDefault()

        const token = getCookie('x-auth-token')

        fetch('http://localhost:9999/coin', {
            method: 'POST',
            body: JSON.stringify({name, price, imageUrl, description, token}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(promise => {
            const authToken = promise.headers.get('Autorization')
            if(authToken){
                document.cookie = `x-auth-token=${authToken}`
            }
            return promise.json()
        }).then(data => {
            if(data.sallesman && document.cookie){
                context.logIn(data)
                props.history.push('/')
            }
        }).catch(e => {
            console.log(e)
        })
    }

    return(
        <Layout className= 'layout'>
        <HeaderNav />
        <Content>
            <div className="site-layout-content" style={{textAlign:"center"}}>
                <h1>CREATE COIN</h1>
                <div>
                    <form className={styles.container} onSubmit={ handleSubmit } >
                        <Input 
                            label='name' 
                            value={ name }
                            onChange={(e) => setName(e.target.value)} 
                            id='name'>
                        </Input>
                        <Input 
                            label='Price' 
                            value={ price } 
                            onChange={(e) => setPrice(e.target.value)} 
                            id='password'>
                        </Input>
                        <Input 
                            label='ImageUrl' 
                            value={ imageUrl }
                            onChange={(e) => setImageUrl(e.target.value)} 
                            id='re-password'>
                        </Input>
                        <textarea className={styles['text-area']}
                            id='descriprion'
                            rows='4'
                            name="description" 
                            placeholder="Give us some description about this offer..."
                            value={ description }
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                        <SubmitButton type='submit' title='Create' />
                    </form> 
                </div>
                
            </div>
        </Content>
        <FooterNav />
    </Layout>
    )    

}

export default CreateCoin