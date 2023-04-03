import React from "react";
import { Pagination as MuiPagination } from "@mui/material";
import { Box } from "@mui/system";

interface PaginationProps {
  pageNumber: number;
  totalResults: number;
  searchSize: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNumber,
  totalResults,
  searchSize,
  onPageChange,
}) => {
  // Calculate the total number of pages based on the total results and search size
  const totalPages = Math.ceil(totalResults / searchSize);

  // Handle the change of the page number and call the onPageChange callback
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
        backgroundColor: "white",
        borderRadius: 4,
        pt: 1,
        pb: 1,
        mb: 2,
      }}
    >
      {/* Render the MUI Pagination component with the calculated total pages and the current page number */}
      <MuiPagination
        count={totalPages}
        page={pageNumber}
        onChange={handleChange}
        color="primary"
      />
    </Box>
  );
};

export default Pagination;
