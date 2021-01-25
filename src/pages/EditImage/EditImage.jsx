import { Grid } from "@material-ui/core";
import { ImageEdit } from "../../components/ImageEdit";
import { MainLayout } from "../../components/layouts/MainLayout";
import { NavigationTitle } from "../../components/NavigationTitle";
import { EDIT_NAVIGATION_TITLES } from "../../utils/navigation-titles";

const EditImage = ({location}) => {
  return (
    <MainLayout>
      <Grid container justify="center" alignItems="center">
        <NavigationTitle titles={EDIT_NAVIGATION_TITLES}/>
      </Grid>
      <ImageEdit image={location.image} title={location.title}/>
    </MainLayout>
  )
}

export default EditImage;