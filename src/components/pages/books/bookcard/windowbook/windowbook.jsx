import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import style from './windowbook.module.css';
import bookWithoutPhoto from '../../../../../assets/images/bookWithoutPhoto.png';
import { Rating } from '../../../../rating';
import { BookButton } from '../bookbutton';
import { fetchBook } from '../../../../../redux/actions/actions';

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
  const [isLoadedImage, setIsLoadedImage] = useState(true);
  const { category } = useParams();
  return (
    <div data-test-id='card' className={style.book}>
      <NavLink to={`/books/${category}/${props.book.id}`}>
        <div className={style.book__content}>
          <div className={style.book__content_image}>
            <img
              src={props.book.image ? `https://strapi.cleverland.by${props.book.image.url}` : bookWithoutPhoto}
              onError={() => {
                setIsLoadedImage(false);
              }}
              alt='bookImage'
            />
          </div>
          <Rating rating={props.book.rating} />

          <h2 className={style.book__content_title}>{props.book.title}</h2>

          <p className={style.book__content_author}>
            {props.book.authors.map((author) => (
              <span className={style.authorName}>{author}</span>
            ))}
            <span className={style.bookYear}>{props.book.issueYear}</span>
          </p>
          <BookButton status={buttonStatus} />
        </div>
      </NavLink>
    </div>
  );
};
const mapDispatchToProps = {
  fetchBook,
};
export const Book = connect(null, mapDispatchToProps)(BookContainer);
