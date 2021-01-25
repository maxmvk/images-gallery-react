import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter } from "../../components/Filter";
import { ImagesList } from "../../components/ImagesList";
import { MainLayout } from "../../components/layouts/MainLayout";
import { NavigationTitle } from "../../components/NavigationTitle";
import { Paginator } from "../../components/Paginator";
import { getImages, setFilter, setImages, setPage, setTotalCount } from "../../redux/actions";
import { MAIN_NAVIGATION_TITLES } from "../../utils/navigation-titles";

const AllImages = () => {
  const auth = useSelector(state => state.auth.isAuth);
  const images = useSelector(state => state.main.images);
  const filter = useSelector(state => state.main.filter);
  const page = useSelector(state => state.main.page);
  const totalCount = useSelector(state => state.main.totalCount);
  const dispatch = useDispatch();

  useEffect(() => {
    if(auth) {
      dispatch(getImages(filter, page));
    }
  }, [dispatch, filter, page, auth]);

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
      <Grid container direction="row" justify="space-between" alignItems="center">
        <NavigationTitle titles={MAIN_NAVIGATION_TITLES}/>
        <Filter currentFilter={filter}/>
      </Grid>
      <ImagesList images={images}/>
      <Paginator currentPage={page} totalCount={totalCount}/>
    </MainLayout>
  )
}

export default AllImages;