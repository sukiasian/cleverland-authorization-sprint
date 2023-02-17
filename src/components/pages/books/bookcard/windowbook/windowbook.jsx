import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import style from './windowbook.module.css';
import bookWithoutPhoto from '../../../../../assets/images/bookWithoutPhoto.png';
import { Rating } from '../../../../rating';
import { BookButton } from '../bookbutton';
import { changeActiveBookTitle, fetchBook } from '../../../../../redux/actions/actions';

export const BookContainer = (props) => {
  const buttonStatus = useMemo(() => {
    if (props.book.delivery) {
      return { className: 'disabled', text: `занята до ${props.book.delivery.dateHandedTo}` };
    }
    if (props.book.booking) {
      return { className: 'secondary', text: 'Забронировано' };
    }
    return { className: 'primary', text: 'Забронировать' };
  }, [props.book.delivery, props.book.booking]);
  const { category } = useParams();
  return (
    <div data-test-id='card' className={style.book}>
      <NavLink
        onClick={() => {
          props.changeActiveBookTitle(props.book.title);
        }}
        to={`/books/${category}/${props.book.id}`}
      >
        <div className={style.book__content}>
          <div className={style.book__content_image}>
            <img src={props.book.image ? `${props.HOST}${props.book.image.url}` : bookWithoutPhoto} alt='bookImage' />
          </div>
          <Rating rating={props.book.rating} />

          <h2 className={style.book__content_title}>{props.book.title}</h2>

          <p className={style.book__content_author}>
            {props.book.authors.map((author) => (
              <span key={author} className={style.authorName}>
                {author}
              </span>
            ))}
            <span className={style.bookYear}>{props.book.issueYear}</span>
          </p>
          <BookButton status={buttonStatus} />
        </div>
      </NavLink>
    </div>
  );
};
const mapStateToProps = (state) => ({ HOST: state.app.HOST });
const mapDispatchToProps = {
  changeActiveBookTitle,
  fetchBook,
};
export const Book = connect(mapStateToProps, mapDispatchToProps)(BookContainer);
