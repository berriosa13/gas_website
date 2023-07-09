import React from 'react'
import styles from "../styles/comp_styles/Footer.module.css";
import config from "../config"

const SubFooter = () => {
    const current = new Date();
    const date = `${current.getFullYear()}`;
  return (
    <>
        <div className={styles.sub_footer}>
          <p>&copy; Copyright <strong>{config.dealership.name} <span>{date}</span></strong>. All Rights Reserved</p>
        </div> 
    </>
  )
}

export default SubFooter