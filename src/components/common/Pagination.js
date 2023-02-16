import React from "react";

//Pagination for userlist
const Pagination = ({ length, setPagination, recordPerPage }) => { 
  return (
    <>
      {[...Array(length).keys()].map((user, index) => {
        if (index % recordPerPage === 0)
          return (
            <button
              type="button"
              onClick={() => {
                setPagination({ start: index, end: index + recordPerPage });
              }}
            >
              {index / recordPerPage + 1}
            </button>
          );
      })}
    </>
  );
};
export default Pagination;
