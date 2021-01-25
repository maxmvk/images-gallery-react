import React from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import styles from "./Filter.module.scss";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/actions";

const Filter = ({currentFilter}) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className={styles.filter}>
      <p className={styles.filter__label}>Sort By</p>
      <FormControl variant="outlined" className={styles.filter__control}>
        <Select
          value={currentFilter}
          onChange={handleChange}
          className={styles.filter__select}
        >
          <MenuItem value={1}>New to old</MenuItem>
          <MenuItem value={-1}>Old to new</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default Filter;