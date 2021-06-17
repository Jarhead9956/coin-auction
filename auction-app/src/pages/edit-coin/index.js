import React, { useContext, useState, useEffect } from 'react'
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


const EditCoin = (props) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const context = useContext(UserContext)

    const coinId = props.match.params.coinid

    useEffect(() => {
        fetch(`http://localhost:9999/coin/${coinId}`)
        .then(response => response.json())
        .then((data) => {
                setName(data.name)
                setPrice(data.price)
                setImageUrl(data.imageUrl)
                setDescription(data.description)
        })
        .catch((e) => console.log(e))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        const token = getCookie('x-auth-token')
        
        fetch(`http://localhost:9999/coin/${coinId}`, {
            method: 'PUT',
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
            props.history.push('/')
        }).catch(e => {
            console.log(e)
        })
    }

    return(
        <Layout className= 'layout'>
        <HeaderNav />
        <Content>
            <div className="site-layout-content" style={{textAlign:"center"}}>
                <h1>EDIT COIN</h1>
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
                        <SubmitButton type='submit' title='Edit' />
                    </form> 
                </div>
                
            </div>
        </Content>
        <FooterNav />
    </Layout>
    )    

}

export default EditCoin