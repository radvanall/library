import React, { useState } from "react";

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
    for (
      let i = totalPages - nrOfDisplayedPages + 1;
      i <= nrOfDisplayedPages;
      i++
    ) {
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
  const [pages, setPages] = useState(initialPages);

  const changePage = (e) => {
    setParams({
      ...params,
      page: parseInt(e.target.value),
    });
  };
  const toPreviousPage = (e) => {
    setParams({
      ...params,
      page: parseInt(e.target.value) - 1,
    });
  };
  const toNextPage = (e) => {
    setParams({
      ...params,
      page: parseInt(e.target.value) + 1,
    });
  };
  const toFirstPage = () => {
    setParams({
      ...params,
      page: 1,
    });
  };
  const toLastPage = () => {
    setParams({
      ...params,
      page: totalPages,
    });
  };
  return {
    pages,
    changePage,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  };
};

export default usePagination;
