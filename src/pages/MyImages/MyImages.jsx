import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Filter } from "../../components/Filter";
import { ImagesList } from "../../components/ImagesList";
import { MainLayout } from "../../components/layouts/MainLayout";
import { NavigationTitle } from "../../components/NavigationTitle";
import { MAIN_NAVIGATION_TITLES } from "../../utils/navigation-titles";
import image from "../../assets/images/add.png"
import styles from "./MyImages.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paginator } from "../../components/Paginator";
import { getImages, setFilter, setImages, setPage, setTotalCount } from "../../redux/actions";

const MyImages = () => {
  const auth = useSelector(state => state.auth.isAuth);
  const userId = useSelector(state => state.auth.userId);
  const images = useSelector(state => state.main.images);
  const filter = useSelector(state => state.main.filter);
  const page = useSelector(state => state.main.page);
  const totalCount = useSelector(state => state.main.totalCount);
  const dispatch = useDispatch();

  useEffect(() => {
    if(auth) {
      dispatch(getImages(filter, page, userId));
    }
  }, [dispatch, filter, page, userId, auth]);

  useEffect(() => {
    return () => {
      dispatch(setFilter(1))
      dispatch(setPage(1))
      dispatch(setImages([]))
      dispatch(setTotalCount(1))
    }
  }, [dispatch]);

  return (
    <MainLayout>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <NavigationTitle titles={MAIN_NAVIGATION_TITLES}/>
      </Grid>
      <NavLink exact to="/new-image" className={styles.link}>
        <Grid container direction="column" justify="center" alignItems="center" className={styles.link__container}>
          <p>Add new image</p>
          <img src={image} alt="Login"/>
        </Grid>
      </NavLink>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Filter currentFilter={filter}/>
      </Grid>
      <ImagesList images={images}/>
      <Paginator currentPage={page} totalCount={totalCount}/>
    </MainLayout>
  )
}

export default MyImages;