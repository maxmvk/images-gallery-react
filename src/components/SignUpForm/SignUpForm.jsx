import { Button, Grid, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { register, setSignUpError } from "../../redux/actions";
import { AUTH_NAVIGATION_TITLES } from "../../utils/navigation-titles";
import { NavigationTitle } from "../NavigationTitle";
import styles from "./SignUpForm.module.scss";

const SignUpForm = () => {
  const [state, setState] = useState({ name: "", surname: "", email: "", password: "" });
  const signUpError = useSelector(state => state.auth.signUpError);
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    return () => {
      dispatch(setSignUpError(null))
    }
  }, [dispatch]);

  const handleInputChange = event => {
    setState({...state, [event.target.name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(register(state, history))
  }

  if(localStorage.getItem('access_token')) {
    return <Redirect to="/all-images"/>
  }

  return (
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
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.signUpForm}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
        >
          <p className={styles.signUpForm__error}>{signUpError}</p>
          <TextField
            type="text" 
            name="name" 
            placeholder="Alex" 
            value={state.name} 
            onChange={handleInputChange}
            label="Name"
            InputLabelProps={{
              shrink: true,
            }}
            className={styles.signUpForm__input}
          />
          <TextField
            type="text" 
            name="surname" 
            placeholder="Doe" 
            value={state.surname} 
            onChange={handleInputChange}
            label="Surname"
            InputLabelProps={{
              shrink: true,
            }}
            className={styles.signUpForm__input}
          />
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
            className={styles.signUpForm__input}
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
            className={styles.signUpForm__input}
          />
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Button variant="contained" type="submit" className={styles.signUpForm__button}>Sign up</Button>
        </Grid>
      </form>
    </Grid>
  )
}

export default SignUpForm;