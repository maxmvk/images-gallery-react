import { Button, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteImage } from "../../redux/actions";
import styles from "./ImagesList.module.scss";

const ImagesList = ({images}) => {
  const userId = useSelector(state => state.auth.userId);
  const fullName = useSelector(state => state.auth.fullName);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteImage(id, userId))
  }

  return (
    <Grid container className={styles.imagesContainer}>
      {
        images.map(item => {
          return (
            <Grid container item xs={4} direction="column" className={styles.item} key={item.id}>
              <Grid container item direction="column" className={styles.item__card}>
                <img src={"http://isocial-api.dev.sevn.pro/storage/"+item.path} alt="Preview" className={styles.item__image}/>
                <p className={styles.item__author}>{item.first_name? item.first_name + " " + item.last_name: fullName}</p>
                <p className={styles.item__title}>{item.title}</p>
              </Grid>
              {
                window?.location.pathname === '/my-images'
                ? <Grid container justify="space-between" item>
                    <NavLink exact to={{
                      pathname: `/edit/${item.id}`,
                      image: "http://isocial-api.dev.sevn.pro/storage/"+item.path,
                      title: item.title
                    }}>
                      <Button variant="contained" type="button" className={styles.item__edit}>Edit</Button>
                    </NavLink>
                    <Button variant="contained" type="button" className={styles.item__delete} onClick={() => handleDelete(item.id)}>Delete</Button>
                  </Grid>
                : null
              }
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default ImagesList;