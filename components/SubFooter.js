import React from 'react'
import styles from "../styles/comp_styles/Footer.module.css";
import GradBar from "./GradBar";

const SubFooter = () => {
    const current = new Date();
    const date = `${current.getFullYear()}`;
  return (
    <>
       {/* <GradBar/> */}
        <div className={styles.sub_footer}>
          <p>&copy; Copyright <strong>Guardian Automobile Sales <span>{date}</span></strong>. All Rights Reserved</p>
        </div> 
    </>
  )
}

export default SubFooter