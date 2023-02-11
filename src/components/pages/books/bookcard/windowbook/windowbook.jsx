import React, { useMemo, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import style from './windowbook.module.css';
import bookWithoutPhoto from '../../../../../assets/images/bookWithoutPhoto.png';
import { Rating } from '../../../../rating';
import { BookButton } from '../bookbutton';

export const Book = (props) => {
  const buttonStatus = useMemo(() => {
    if (props.book.isBooked) {
      return { className: 'primary', text: 'Забронировать' };
    }
    if (props.book.stock) {
      return { className: 'secondary', text: 'Забронировано' };
    }
    return { className: 'disabled', text: `занята до ${props.book.bookedTill}` };
  }, [props.book.isBooked, props.book.stock, props.book.bookedTill]);
  const [isLoadedImage, setIsLoadedImage] = useState(true);
  const { category } = useParams();

  return (
    <div data-test-id='card' className={style.book}>
      <NavLink to={`/books/${category}/${props.book.id}`}>
        <div className={style.book__content}>
          <div className={style.book__content_image}>
            <img
              src={isLoadedImage ? props.book.image : bookWithoutPhoto}
              onError={() => {
                setIsLoadedImage(false);
              }}
              alt='bookImage'
            />
          </div>
          <Rating rating={props.book.rating} />

          <h2 className={style.book__content_title}>{props.book.title}</h2>

          <p className={style.book__content_author}>
            {props.book.author},{props.book.year}
          </p>
          <BookButton status={buttonStatus} />
        </div>
      </NavLink>
    </div>
  );
};
