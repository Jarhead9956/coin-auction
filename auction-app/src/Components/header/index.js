import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/coin-logo.png';
import getNavigation from '../../utils/navigation';
import UserContext from '../../Context'
import { Layout, Menu } from 'antd'
import style from './index.module.css'

const { Header} = Layout

const HeaderNav = (props) => {
    const {
        loggedIn,
        user
    } = useContext(UserContext)

    const links = getNavigation(loggedIn, user)
    return (
        <Header className={style.menu}>
            <div className="logo" />
            <Menu  theme="light" mode="horizontal">
                <Menu.Item className={style["menu-item"]} key="/home" >
                    <Link to="/"><img className={style.logo} src={logo} alt="Navigation logo"/>
                    </Link> 
                </Menu.Item>
                {
                    links.map((navElement) => {
                        return (<Menu.Item className={style["menu-item"]} key={navElement.link} >
                                   <Link to={navElement.link}>{navElement.title}</Link> 
                                </Menu.Item>)
                    })
                }
            </Menu>
        </Header>
    
    )
}

export default HeaderNav