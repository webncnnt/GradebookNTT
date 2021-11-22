import React from "react";
import ArrowDoubleLeftIcon from "../../icons/ArrowDoubleLeft";
import ArrowDoubleRightIcon from "../../icons/ArrowDoubleRight";
import ArrowLeftIcon from "../../icons/ArrowLeft";
import ArrowRightIcon from "../../icons/ArrowRight";
import MoreLineIcon from "../../icons/MoreLine";
import Icon from "../icon/Icon";

type paginateProps = {
  totalItem: number;
  itemPerPage: number;
  pageActive: number;
  setPageActive: (page: number) => void;
};

const Pagination = ({
  totalItem,
  itemPerPage,
  pageActive,
  setPageActive,
}: paginateProps) => {
  const totalPages = Math.ceil(totalItem / itemPerPage);

  const onChangePageActive = (page: number) => {
    setPageActive(page);
  };

  return (
    <div className="pagination">
      {pageActive > 1 ? (
        <>
          <ArrowDoubleLeftIcon
            className="frame-stroke icon-stroke--black"
            onClick={() => onChangePageActive(1)}
          />
          <ArrowLeftIcon
            className="frame icon-fill--black"
            onClick={() => onChangePageActive(pageActive - 1)}
          />
        </>
      ) : null}

      {totalPages <= 3
        ? Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => {
              return (
                <Icon
                  className={
                    "frame fz1" +
                    (pageActive === pageNumber ? " icon-active" : "")
                  }
                  key={pageNumber}
                  onClick={() => onChangePageActive(pageNumber)}
                >
                  {pageNumber}
                </Icon>
              );
            }
          )
        : null}

      {totalPages > 3 ? (
        <>
          {pageActive < totalPages - 2
            ? pageActive > 1
              ? [pageActive - 1, pageActive, pageActive + 1].map(
                  (pageNumber) => {
                    return (
                      <Icon
                        className={
                          "frame fz1" +
                          (pageActive === pageNumber ? " icon-active" : "")
                        }
                        key={pageNumber}
                        onClick={() => onChangePageActive(pageNumber)}
                      >
                        {pageNumber}
                      </Icon>
                    );
                  }
                )
              : [pageActive, pageActive + 1].map((pageNumber) => {
                  return (
                    <Icon
                      className={
                        "frame fz1" +
                        (pageActive === pageNumber ? " icon-active" : "")
                      }
                      key={pageNumber}
                      onClick={() => onChangePageActive(pageNumber)}
                    >
                      {pageNumber}
                    </Icon>
                  );
                })
            : [totalPages - 3, totalPages - 2, totalPages - 1, totalPages].map(
                (pageNumber) => {
                  return (
                    <Icon
                      className={
                        "frame fz1" +
                        (pageActive === pageNumber ? " icon-active" : "")
                      }
                      key={pageNumber}
                      onClick={() => onChangePageActive(pageNumber)}
                    >
                      {pageNumber}
                    </Icon>
                  );
                }
              )}
          {pageActive + 2 < totalPages ? <MoreLineIcon /> : null}
          {pageActive < totalPages - 2 ? (
            <Icon
              className={
                "frame fz1" + (pageActive === totalPages ? " icon-active" : "")
              }
              onClick={() => onChangePageActive(totalPages)}
            >
              {totalPages}
            </Icon>
          ) : null}
        </>
      ) : null}
      {pageActive < totalPages ? (
        <>
          <ArrowRightIcon
            className="frame icon-fill--black"
            onClick={() => onChangePageActive(pageActive + 1)}
          />
          <ArrowDoubleRightIcon
            className="frame-stroke icon-stroke--black"
            onClick={() => onChangePageActive(totalPages)}
          />
        </>
      ) : null}
    </div>
  );
};

export default Pagination;
