import React from "react";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import { useUsers } from "../../context/UsersContext";

const UsersFooter = () => {
  const { params, setParams, users } = useUsers();
  const {
    pages,
    currentPage,
    changePage,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  } = usePagination(params, setParams, users?.totalNumber || 1, 5);
  return (
    <div>
      {users && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          next={users?.next || null}
          previous={users?.previous || null}
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

export default UsersFooter;
