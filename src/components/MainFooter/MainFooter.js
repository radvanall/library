import React, { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";

const MainFooter = () => {
  const { params, setParams, books } = useContext(MainContext);
  const {
    pages,
    currentPage,
    changePage,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  } = usePagination(params, setParams, books?.totalNumber || 1, 5);

  return (
    <div>
      {books && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          next={books?.next || null}
          previous={books?.previous || null}
          changePage={changePage}
          toFirstPage={toFirstPage}
          toLastPage={toLastPage}
          toNextPage={toNextPage}
          toPreviousPage={toPreviousPage}
        />
      )}
    </div>
  );
};

export default MainFooter;
