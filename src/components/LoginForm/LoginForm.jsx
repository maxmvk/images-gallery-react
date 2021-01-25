import { Button, Grid, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, setLoginError } from "../../redux/actions";
import { AUTH_NAVIGATION_TITLES } from "../../utils/navigation-titles";
import { LoginContainer } from "../layouts/LoginContainer";
import { NavigationTitle } from "../NavigationTitle";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const auth = useSelector(state => state.auth.isAuth);
  const loginError = useSelector(state => state.auth.loginError);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setLoginError(null))
    }
  }, [dispatch]);

  const handleInputChange = event => {
    setState({...state, [event.target.name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(login(state))
  }

  if(auth && localStorage.getItem('access_token')) {
    return <Redirect to="/all-images"/>
  }

  return (
    <LoginContainer>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        className={styles.wrapper}
      >
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <NavigationTitle titles={AUTH_NAVIGATION_TITLES}/>
        </Grid>
        <form onSubmit={handleSubmit} autoComplete="off" className={styles.loginForm}>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="stretch"
          >
            <p className={styles.loginForm__error}>{loginError}</p>
            <TextField
              type="text" 
              name="email" 
              placeholder="alex@gmail.com" 
              value={state.email} 
              onChange={handleInputChange}
              label="Email"
              InputLabelProps={{
                shrink: true,
              }}
              className={styles.loginForm__input}
            />
            <TextField
              type="password" 
              name="password" 
              placeholder="********" 
              value={state.password} 
              onChange={handleInputChange}
              label="Password"
              InputLabelProps={{
                shrink: true,
              }}
              className={styles.loginForm__input}
            />
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            <Button variant="contained" type="submit" className={styles.loginForm__button}>Login</Button>
          </Grid>
        </form>
      </Grid>
    </LoginContainer>
  )
}

export default LoginForm;