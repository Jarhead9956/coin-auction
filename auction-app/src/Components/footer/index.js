import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import getNavigation from '../../utils/navigation';
import UserContext from '../../Context'
import { Layout, Menu } from 'antd'
import style from './index.module.css'

const { Footer} = Layout

const FooterNav = (props) => {
    const {
        loggedIn,
        user
    } = useContext(UserContext)

    const links = getNavigation(loggedIn, user)
    return (
        <Footer className={style.menu}>
            <Menu  theme="light" mode="horizontal" >


                {
                    links.map((navElement, index) => {
                        return (<Menu.Item key={index} >
                                    <Link key={navElement.link} to={navElement.link}>{navElement.title}</Link> 
                                </Menu.Item>)
                    })
                }
            </Menu>
            <p className={style.p}>Hristo Ilchev ©2021</p>
        </Footer>
    
    )
}

export default FooterNav


