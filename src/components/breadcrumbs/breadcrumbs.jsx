import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import style from './breadcrumbs.module.css';

export const Breadcrumbs = (props) => {
  const pathtTitle = useSelector((state) => state.books.activeCategory);
  console.log(pathtTitle);
  return (
    <div className={style.breadcrumbs}>
      <div className={style.breadcrumbs__content}>
        <NavLink
          data-test-id='breadcrumbs-link'
          to={`/books${props.path}`}
          className={style.breadcrumbs__content_route}
        >
          {pathtTitle}
        </NavLink>
        <span className={style.breadcrumbs__content_separator}>/</span>
        <span className={style.breadcrumbs__content_route}>{props.bookTitle}</span>
      </div>
    </div>
  );
};
