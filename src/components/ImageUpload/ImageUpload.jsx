import React, { useRef, useState } from "react";
import styles from "./ImageUpload.module.scss";
import image from "../../assets/images/image-gallery.svg"
import { Button, Grid, TextField } from "@material-ui/core";
import { addImage } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const ImageUpload = () => {
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const hiddenFileInput = useRef(null);
  const history = useHistory()
  const dispatch = useDispatch();

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
    if(event.target.files[0]) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onloadend = event => {
        setImageUrl(reader.result);
      }
    }
  }

  const uploadFile = () => {
    hiddenFileInput.current.click();
  };

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(addImage(description, selectedFile, history))
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={styles.upload}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid container direction="column" justify="center" alignItems="center" className={styles.upload__choose} onClick={uploadFile}>
          <p>Choose image</p>
          <img src={imageUrl? imageUrl: image} alt="Login"/>
        </Grid>
        {/* This input is only for the possibility of choosing a file. Never displayed! */}
        <input
          type="file"
          ref={hiddenFileInput}
          style={{display: 'none'}}
          onChange={handleFileChange}
        />
        <Grid container direction="column" justify="space-between" alignItems="stretch" className={styles.upload__description}>
          <p>Choose description</p>
          <TextField
            autoComplete="off"
            type="text" 
            name="description" 
            placeholder="My first image" 
            value={description} 
            onChange={(event) => setDescription(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            className={styles.description__input}
          />
        </Grid>
      </Grid>
      <Button variant="contained" type="button" onClick={handleSubmit} className={styles.upload__button}>Upload</Button>
    </Grid>
  )
}

export default ImageUpload;