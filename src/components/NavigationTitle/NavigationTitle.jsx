import React from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from "./NavigationTitle.module.scss";

const NavigationTitle = ({titles}) => {
  const { id } = useParams()
  let updatedTitles = titles
  
  if(id) {
    updatedTitles = [...titles, {name: 'Edit image', link: `/edit/${id}`}]
  }

  return (
    <div className={styles.navContainer}>
      {
        updatedTitles.map((title, index) => {
          return (
            <div className={styles.nav} key={title.name}>
              {index !== 0? <div className={styles.nav__link}>/</div> : null}
              <NavLink 
                exact to={title.link} 
                className={styles.nav__link} 
                activeClassName={styles.nav__link_active}
              >
                {title.name}
              </NavLink>
            </div>
          )
        })
      }
    </div>
  )
}

export default NavigationTitle;