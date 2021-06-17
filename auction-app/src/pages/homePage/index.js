import React, { useContext, useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import HeaderNav from '../../Components/header'
import FooterNav from '../../Components/footer'
import Coin from '../../Components/coin'
import UserContext from '../../Context'
import { Layout } from 'antd';


const { Content } = Layout;

function HomePage() {

  const [coins, setCoins] = useState([])
  const context = useContext(UserContext)

  const renderCoins = () => {
      return coins.map(( coin, index ) => {
          return (
              <Coin key={coin._id} index={ index + 1 } {...coin} />
          )
      })
  }

  useEffect(() => {
      fetch('http://localhost:9999/coin')
      .then(responce => responce.json())
      .then((data) => {
          setCoins(data)
      })
      .catch((e) => console.log(e));

  }, [])


  return (
    <Layout className= 'layout'>
        <HeaderNav />
        <Content>
            <div className="site-layout-content" style={{textAlign:"center"}}>
                <h1>AUCTION</h1>
                <div>
                  {renderCoins()}
                </div>
                
            </div>
        </Content>
        <FooterNav />
    </Layout>
  );
}

export default HomePage;
