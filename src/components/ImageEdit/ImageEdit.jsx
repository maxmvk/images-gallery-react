import React, { useRef, useState } from "react";
import styles from "./ImageEdit.module.scss";
import defImage from "../../assets/images/image-gallery.svg"
import { Button, Grid, TextField } from "@material-ui/core";
import { updateImage } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const ImageEdit = ({image, title}) => {
  const [description, setDescription] = useState(title);
  const [selectedFile, setSelectedFile] = useState();
  const [imageUrl, setImageUrl] = useState(image);
  const hiddenFileInput = useRef(null);
  const history = useHistory()
  const dispatch = useDispatch();
  const { id } = useParams();

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
    dispatch(updateImage(description, selectedFile, id, history))
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={styles.upload}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid container direction="column" justify="center" alignItems="center" className={styles.upload__choose} onClick={uploadFile}>
          <p>Edit image</p>
          <img src={imageUrl? imageUrl: defImage} alt="Login"/>
        </Grid>
        {/* This input is only for the possibility of choosing a file. Never displayed! */}
        <input
          type="file"
          ref={hiddenFileInput}
          style={{display: 'none'}}
          onChange={handleFileChange}
        />
        <Grid container direction="column" justify="space-between" alignItems="stretch" className={styles.upload__description}>
          <p>Edit description</p>
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
      <Button variant="contained" type="button" onClick={handleSubmit} className={styles.upload__button}>Update</Button>
    </Grid>
  )
}

export default ImageEdit;