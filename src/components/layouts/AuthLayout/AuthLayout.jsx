import React from "react";
import styles from "./AuthLayout.module.scss";
import { LoginImage } from "../../LoginImage";
import { Grid } from "@material-ui/core";

export default function AuthLayout({ children }) {

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={4}
      className={styles.container}
    >
      <LoginImage/>
      {children}
    </Grid>
  )
}
