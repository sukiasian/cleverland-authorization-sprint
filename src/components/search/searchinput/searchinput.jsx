import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { filterBooks, searchBooks } from '../../../redux/actions/actions';
import style from './searchinput.module.css';

const SearchInputContainer = (props) => (
  <>
    <button
      data-test-id={props.status === 'notActive' ? 'button-search-open' : ''}
      onClick={() => {
        props.setActiveSearch(true);
      }}
      className={props.status === 'active' ? style.activeButton : style.inputButton}
      type='button'
    >
      <img src={props.image} alt={props.image} />
    </button>
    <input
      onFocus={() => {
        props.setActiveBigSearch(true);
      }}
      onBlur={() => {
        props.setActiveBigSearch(false);
      }}
      onChange={(e) => props.searchBooks(e.target.value)}
      data-test-id='input-search'
      className={props.status === 'active' ? style.activeInput : style.input}
      value={props.booksSearchValue}
      placeholder={props.placeholderValue}
      type='text'
    />
    {props.status === 'active' && (
      <button data-test-id='button-search-close' onClick={() => props.setActiveSearch(false)} type='button'>
        <div className={style.cross}>
          <span className={style.left} />
          <span className={style.right} />
        </div>
      </button>
    )}
  </>
);

const mapStateToProps = (state) => ({ booksSearchValue: state.books.booksSearchValue });
const mapDispatchToProps = {
  filterBooks,
  searchBooks,
};
export const SearchInput = connect(mapStateToProps, mapDispatchToProps)(SearchInputContainer);
