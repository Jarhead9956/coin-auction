import React, { useEffect, useState, useContext} from "react"
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import HeaderNav from '../../Components/header'
import FooterNav from '../../Components/footer'
import styles from './index.module.css'
import UserContext from '../../Context'
import getCookie from "../../utils/cookie"

import { Layout, Button } from 'antd';


const { Content } = Layout;

const DetailCoin = (props) => {
    const [coin, setCoin] = useState([])
    const [isCreator, setIsCreator] = useState(false)
    const [buyIt, setBuyIt] = useState(false)

    const context = useContext(UserContext)
    const coinId = props.match.params.coinid

    useEffect(() => {
        fetch(`http://localhost:9999/coin/${coinId}`)
        .then(response => response.json())
        .then((data) => {
            setCoin(data)

            if(data.sallesman.username === context.user.username) {
                setIsCreator(true)
            }
        })
        .catch((e) => console.log(e))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:9999/coin/${coinId}`)
        .then(response => response.json())
        .then((data) => {
            coin.buyers.forEach(buyerId => {
                if(buyerId === context.user._id) {
                    setBuyIt(true)
                }
            });
        })
        .catch((e) => console.log(e))
    }, [coin])

    const buyCoin = () => {
        const token = getCookie('x-auth-token')
    
        fetch(`http://localhost:9999/coin/buy/${coinId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({...coin, token}),
          })
        .then(response => response.json())
        .then((data) => {
           setBuyIt(true)
        })
        .catch((e) => console.log(e))
    }

    const renderButtons = () => {
        const path = `edit/${coinId}`

        if(isCreator){
            return(
                <div>
                    <Button className={styles.button} onClick={deleteCoin} size='large'>DELETE</Button>
                    <Button className={styles.button} size='large'><Link to={path}>EDIT</Link></Button>
                </div> 
            )
        }else{
            if(buyIt) {
                return(
                    <div>
                        <p>You bought it!</p>
                    </div>
                )
            }
            return (
                <Button className={styles.button} onClick={buyCoin} size='large'>BUY IT</Button>
            )
        }
        
        
    }

    const deleteCoin = () => {
        fetch(`http://localhost:9999/coin/${coinId}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        props.history.push('/')
    }

    return(
        <Layout className= 'layout'>
            <HeaderNav />
            <Content>
                <div className="site-layout-content" style={{textAlign:"center"}}>
                    <h2 className={styles.title}>{coin.name}</h2>
                    <p className={styles.description}>
                        <img className={styles[`coin-image`]} src={coin.imageUrl} alt='Coin'></img>
                        <span><b>Description:</b>  {coin.description }</span>
                        
                    </p>
                    <div className={styles.price}>
                    <h3>Price: {coin.price}</h3>
                    {renderButtons()}
                    </div>
                    
                </div>
                
            </Content>
            <FooterNav />
        </Layout>
    )
}

export default DetailCoin