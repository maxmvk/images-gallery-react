import React from "react";
import styles from "./LoginContainer.module.scss";
import { Grid } from "@material-ui/core";

export default function LoginContainer({ children }) {

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={styles.loginContainer}>
      {children}
    </Grid>
  )
}
