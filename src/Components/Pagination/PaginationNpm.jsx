import React from 'react'
import ReactPaginate from 'react-paginate'

export default function Pagination( {totalPages, changePage}) {
  return (
    <>
          <div className='w-100 '>
        <ReactPaginate

          previousLabel={"Previous"}
          nextLabel={"Next"}

          pageCount={totalPages}
          onPageChange={changePage}

          containerClassName={"navigationButtons"}
          previousLinkClassName={"previousButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"navigationDisabled"}
          activeClassName={"navigationActive"}

        />
          </div>



    </>
  )
}
