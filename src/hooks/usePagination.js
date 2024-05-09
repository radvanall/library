import React, { useState, useEffect } from "react";

const usePagination = (params, setParams, totalNumber, nrOfDisplayedPages) => {
  const totalPages = parseInt(
    Math.ceil(parseInt(totalNumber) / parseInt(params.limit))
  );

  const initialPages = [];
  if (totalPages <= nrOfDisplayedPages) {
    for (let i = 1; i <= totalPages; i++) {
      initialPages.push(i);
    }
  } else if (parseInt(params?.page) <= Math.ceil(nrOfDisplayedPages / 2)) {
    for (let i = 1; i <= nrOfDisplayedPages; i++) {
      initialPages.push(i);
    }
  } else if (
    parseInt(params?.page) + Math.floor(nrOfDisplayedPages / 2) >
    totalPages
  ) {
    for (let i = totalPages - nrOfDisplayedPages + 1; i <= totalPages; i++) {
      initialPages.push(i);
    }
  } else {
    const start =
      parseInt(params?.page) - parseInt(Math.floor(nrOfDisplayedPages / 2));
    const end =
      parseInt(params?.page) + parseInt(Math.floor(nrOfDisplayedPages / 2));
    for (let i = start; i <= end; i++) {
      initialPages.push(i);
    }
  }
  const [pages, setPages] = useState([...initialPages]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(params.page);
  }, [params.page]);
  useEffect(() => {
    setPages([...initialPages]);
  }, [totalPages, currentPage]);

  const changePage = (e) => {
    setCurrentPage(parseInt(e.target.value));
    setParams({
      ...params,
      page: parseInt(e.target.value),
    });
  };
  const toPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
    setParams({
      ...params,
      page: parseInt(params.page) - 1,
    });
  };
  const toNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    setParams({
      ...params,
      page: parseInt(params.page) + 1,
    });
  };
  const toFirstPage = () => {
    setCurrentPage(1);
    setParams({
      ...params,
      page: 1,
    });
  };
  const toLastPage = () => {
    setCurrentPage(totalPages);
    setParams({
      ...params,
      page: totalPages,
    });
  };
  console.log(initialPages);
  return {
    pages,
    currentPage,
    changePage,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  };
};

export default usePagination;
