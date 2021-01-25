import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../../redux/actions";
import styles from "./Paginator.module.scss";

const Paginator = ({currentPage, totalCount}) => {
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };

  return (
    <Grid container justify="center" alignItems="center" className={styles.pagesContainer}>
      <Pagination count={totalCount} page={currentPage} onChange={handleChange}/>
    </Grid>
  )
}

export default Paginator;