import { Grid } from "@material-ui/core";
import { ImageUpload } from "../../components/ImageUpload";
import { MainLayout } from "../../components/layouts/MainLayout";
import { NavigationTitle } from "../../components/NavigationTitle";
import { ADD_NAVIGATION_TITLES } from "../../utils/navigation-titles";

const AddNewImage = () => {
  return (
    <MainLayout>
      <Grid container justify="center" alignItems="center">
        <NavigationTitle titles={ADD_NAVIGATION_TITLES}/>
      </Grid>
      <ImageUpload/>
    </MainLayout>
  )
}

export default AddNewImage;