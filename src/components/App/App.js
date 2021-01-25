import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { AddNewImage } from '../../pages/AddNewImage';
import { AllImages } from '../../pages/AllImages';
import { EditImage } from '../../pages/EditImage';
import { Login } from '../../pages/Login';
import { MyImages } from '../../pages/MyImages';
import { SignUp } from '../../pages/SignUp';
import { getUser } from '../../redux/actions';
import styles from './App.module.scss';

const App = (props) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if(token) {
      dispatch(getUser());
    }
  }, [dispatch, token]);

  return (
    <div className={styles.wrapper}>
      <Route exact path="/" render={() => <Redirect to="/all-images" />}/>
      <Route exact path="/all-images" component={AllImages}/>
      <Route exact path="/my-images" component={MyImages}/>
      <Route exact path="/new-image" component={AddNewImage} />
      <Route exact path="/edit/:id?" component={EditImage}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/sign-up" component={SignUp}/>
      {/* <Route exact path="*" render={() => <Redirect to="/all-images" />}/> */}
    </div>
  )
}

export default App;
