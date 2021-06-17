import React, {Component, useContext, useEffect, useState} from "react"
import 'antd/dist/antd.css'
import UserContext from '../../Context'
import Coin from '../../Components/coin'
import HeaderNav from '../../Components/header'
import FooterNav from '../../Components/footer'
import styles from './index.module.css'

import { Layout, Button } from 'antd';


const { Content } = Layout;

const ProfilePage = (props) => {
    const [myCoins, setMyCoins] = useState([])
    const [username, setUsername] = useState('')
    const context = useContext(UserContext)

    const renderMyCoins = () => {
            return myCoins.map(( coin, index) => {
                return (
                    <Coin 
                        key={index} 
                        name={coin.name}
                        imageUrl={coin.imageUrl}
                        _id={coin._id}
                        description={coin.description} 
                    />
                )
            })
        
    }

    const logOut = () => {
        context.logOut()

        props.history.push('/')
    }

    useEffect(() => {
        const userId = props.match.params.userid
        fetch(`http://localhost:9999/user?id=${userId}`)
        .then(response => response.json())
        .then((data) => {
            
            data.map((user) => {
                if(user._id === userId){
                    setMyCoins(user.myCoins)
                    setUsername(user.username)
                }
                
            })
        })
        .catch((e) => console.log(e))
    }, [])
    
    return(
        <Layout className= 'layout'>
            <HeaderNav />
            <Content>
                <div className={styles.container}>
                    <img className={styles.img} alt='Profile ' src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80'></img>
                    <div className={styles['personal-info']}>
                        <p className={styles.p}>
                            <span>Username: </span>
                            {username}
                        </p>
                        <p>
                            <span>My coins: </span>
                            {myCoins.length}
                        </p>
                        <Button className={styles.button} onClick={logOut} size='small'>LOG OUT</Button>
                    </div>
                </div>
                <div className="site-layout-content" style={{textAlign:"center"}}>
                    {renderMyCoins()}
                </div>
            </Content>
            <FooterNav />
        </Layout>
    )    
}

export default ProfilePage