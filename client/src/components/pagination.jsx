

import React, { Component, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../actions";
import './pagination.css'

function Pagination () {

    const state = useSelector(state=>state)
    const dispatch = useDispatch()
  
//   totalGames: 9,
//   gamesForPage: 9, //cantidad de juegos a mostrar por pagina
//   totalPages: Math.ceil(totalGames / pageLimit),
//   state.pagesToShow: 5,
//   currentPage: 1,
//   startIndex:0,
//   endIndex:9
  
  function setPage(page) {
    if (page < 1) {
      page = 1;
    } else if (page > state.totalPages) {
      page = state.totalPages;
    }
    
    dispatch(changePage({
      currentPage: page,
      startIndex: (page - 1) * state.gamesForPage,
      endIndex: page * state.gamesForPage
    }))
    console.log('deberia despachar una accion', page, (page - 1) * state.gamesForPage, page * state.gamesForPage);
  }

  function getPager() {
    var pages = [],
      startFromNumber;

    if (state.totalPages <= state.pagesToShow) {
      startFromNumber = 1;
      state.pagesToShow = state.totalPages;
    } else {
      if (state.currentPage <= Math.ceil(state.pagesToShow / 2)) {
        startFromNumber = 1;
      } else if (
        state.currentPage + Math.floor((state.pagesToShow - 1) / 2) >=
        state.totalPages
      ) {
        startFromNumber = state.totalPages - (state.pagesToShow - 1);
      } else {
        startFromNumber = state.currentPage - Math.floor(state.pagesToShow / 2);
      }
    }

    for (let i = 1; i <= state.pagesToShow; i++) {
      pages.push(startFromNumber++);
    }
    
    return {
      currentPage:state.currentPage,
      totalPages:state.totalPages,
      pages
    };
  }

  
    
      // console.log(pager);
      
      if (!state.totalPages || state.totalPages === 1) return null
      var pager = getPager()

      return (
        <div className='box_pagination row col-xs-12 text-center'>
      <ul className="pagination">
        <li>
          <button
            disabled={pager.currentPage === 1 ? true : false}
            onClick={() => setPage(1)}
          >
            Inicio
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
            Último
          </button>
        </li>
      </ul>
      </div>
    );
}


export default Pagination;

