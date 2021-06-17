import React from 'react';
import { Link } from 'react-router-dom'
import styles from './index.module.css';
import 'antd/dist/antd.css'
import { Button } from 'antd';

const Coin = ({ name, imageUrl, description, sallsman, index, _id }) => {
    const path = `/details/${_id}`

    return (
        <div className={styles.container}>
            <h3>{name}</h3>
            <p className={styles.description}>
                <img className={styles[`coin-image`]} src={imageUrl} alt="Phost "/>
                <span><b>Description: </b></span>
                {description}
            </p>
            <div>
            <Button className={styles['details-button']} block ><Link to={path}>Details</Link></Button>
            </div>   
        </div>
    )
}

export default Coin