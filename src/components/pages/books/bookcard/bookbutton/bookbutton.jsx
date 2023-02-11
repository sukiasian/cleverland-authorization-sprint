import React from 'react';
import style from './bookbutton.module.css';

export const BookButton = (props) => (
  <button className={`${style.book__button} ${style[props.status.className]}`} type='button'>
    {props.status.text}
  </button>
);
