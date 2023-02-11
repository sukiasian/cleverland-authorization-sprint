import React from 'react';
import style from './searchinput.module.css';

export const SearchInput = (props) => (
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
      data-test-id='input-search'
      className={props.status === 'active' ? style.activeInput : style.input}
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
