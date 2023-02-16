import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import style from './breadcrumbs.module.css';

export const Breadcrumbs = (props) => {
  const pathTitle = useSelector((state) => state.books.activeCategory);
  return (
    <div className={style.breadcrumbs}>
      <div className={style.breadcrumbs__content}>
        <NavLink
          data-test-id='breadcrumbs-link'
          to={`/books${props.path}`}
          className={style.breadcrumbs__content_route}
        >
          {pathTitle}
        </NavLink>
        <span className={style.breadcrumbs__content_separator}>/</span>
        <span className={style.breadcrumbs__content_route}>{props.bookTitle}</span>
      </div>
    </div>
  );
};
