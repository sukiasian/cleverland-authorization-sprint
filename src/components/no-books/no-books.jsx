import React from 'react';
import style from './no-books.module.css';

export const NoBooks = (props) => (
  <p
    data-test-id={props.text === 'По запросу ничего не найдено' ? 'search-result-not-found' : 'empty-category'}
    className={style.text}
  >
    {props.text}
  </p>
);
