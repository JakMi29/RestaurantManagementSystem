import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgress, Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getAuthToken } from '../../util/auth';
import { useNavigate } from 'react-router-dom';

const CustomPagination = ({ page, pageSize, totalRows, onPageChange, onPageSizeChange }) => {
  const totalPages = Math.ceil(totalRows / pageSize);

  const handlePrev = () => {
    if (page > 0) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      onPageChange(page + 1);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" padding={1}>
      <Typography variant="body2">
        Strona {page + 1} z {totalPages} | Liczba elementów na stronie: {pageSize}
      </Typography>
      <Box>
        <Button onClick={handlePrev} disabled={page === 0}>
          Prev
        </Button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            onClick={() => onPageChange(index)}
            variant={index === page ? 'contained' : 'outlined'}
            color={index === page ? 'primary' : 'default'}
          >
            {index + 1}
          </Button>
        ))}
        <Button onClick={handleNext} disabled={page === totalPages - 1}>
          Next
        </Button>
      </Box>
    </Box>
  );
};