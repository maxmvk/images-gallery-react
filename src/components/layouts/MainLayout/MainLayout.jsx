import React from "react";
import styles from "./MainLayout.module.scss";
import { Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";

export default function MainLayout({ children }) {
  const token = localStorage.getItem('access_token');

  if(!token) {
    return <Redirect to="/login"/>
  }

  return (
    <Grid
      container
      className={styles.container}
    >
      {children}
    </Grid>
  )
}
