/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";

import { getAllCompanies } from "../../redux/companyRelated/companyHandle";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCompanies(page));
  }, [dispatch, page]);

  return (
    <Pagination
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      sx={{
        justifyContent: "center",
        display: "flex",
      }}
      renderItem={(item) => (
        <PaginationItem
          sx={{ width: "55px", height: "55px" }}
          {...item}
          component={Link}
          to={`/company?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
