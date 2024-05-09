import React, { useRef } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  pages,
  currentPage,
  changePage,
  next,
  previous,
  toFirstPage,
  toLastPage,
  toNextPage,
  toPreviousPage,
}) => {
  console.log("pages=", pages);

  return (
    <div className={styles.pagination}>
      {currentPage != 1 && (
        <button className={styles.arrow__button} onClick={() => toFirstPage()}>
          {"<<"}
        </button>
      )}
      {pages && (
        <>
          {previous && (
            <button
              className={styles.arrow__button}
              onClick={() => toPreviousPage()}
            >
              Prev
            </button>
          )}
          {pages.map((page) => (
            <button
              className={
                parseInt(page) === parseInt(currentPage)
                  ? styles.current__page
                  : styles.page__number
              }
              key={page}
              value={page}
              onClick={(e) => {
                changePage(e);
              }}
            >
              {page}
            </button>
          ))}
          {next && (
            <button
              className={styles.arrow__button}
              onClick={() => toNextPage()}
            >
              Next
            </button>
          )}
        </>
      )}
      {currentPage != pages[pages.length - 1] && (
        <button className={styles.arrow__button} onClick={() => toLastPage()}>
          {">>"}
        </button>
      )}
    </div>
  );
};

export default Pagination;
