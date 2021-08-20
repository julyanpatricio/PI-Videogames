import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../actions";
import './pagination.css'

function Pagination () {

    const state = useSelector(state=>state)
    const dispatch = useDispatch()
  

  function setPage(page) {
    dispatch(changePage({
      currentPage: page,
      startIndex: (page - 1) * state.gamesForPage,
      endIndex: page * state.gamesForPage
    })) 
  }

  function getPager() {
    let pages = [],
      startFromNumber

      if (state.currentPage <= Math.ceil(state.pagesToShow / 2)) {
        startFromNumber = 1; //verifico si ya me pase del 3 para ver si tengo que incrementar los valores de los botones
      } else 
      if (
        state.currentPage + Math.floor((state.pagesToShow - 1) / 2) >= state.totalPages
      ) { // si adelante de la pagina actual hay menos de 2 botones, muestro los ultimos 5
        startFromNumber = state.totalPages - (state.pagesToShow - 1); 
      } else { //en caso de no estar en ninguno de los 2 extremos, voy mostrando desde 2 antes de la pagina actual
        startFromNumber = state.currentPage - Math.floor(state.pagesToShow / 2);
      }

    for (var i = 1; i <= state.pagesToShow; i++) {
      pages.push(startFromNumber++);
    }
    
    return {
      currentPage:state.currentPage,
      totalPages:state.totalPages,
      pages
    };
  }

  
      if (!state.totalPages || state.totalPages === 1) return null
      var pager = getPager()

      return (

      <ul className="pagination">
        <li>
          <button
            disabled={pager.currentPage === 1 ? true : false}
            onClick={() => setPage(1)}
          >
            First
          </button>
        </li>
        <li>
          <button
            disabled={pager.currentPage === 1 ? true : false}
            onClick={() => setPage(pager.currentPage - 1)}
          >
            Prev
          </button>
        </li>
        {pager.pages.map((page, index) => (
          <li key={index}>
            <button
              className={pager.currentPage === page ? "active" : ""}
              onClick={() => setPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={pager.currentPage === pager.totalPages ? true : false}
            onClick={() => setPage(pager.currentPage + 1)}
          >
            Next
          </button>
        </li>
        <li>
          <button
            disabled={pager.currentPage === pager.totalPages ? true : false}
            onClick={() => setPage(pager.totalPages)}
          >
            Latest
          </button>
        </li>
      </ul>
      // </div>
    );
}


export default Pagination;

