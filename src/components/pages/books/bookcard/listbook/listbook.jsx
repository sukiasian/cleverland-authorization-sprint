import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './listbook.module.css';
import bookWithoutPhoto from '../../../../../assets/images/bookWithoutPhoto.png';
import { Rating } from '../../../../rating';
import { BookButton } from '../bookbutton';

export const ListBook = (props) => {
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
  return (
    <div className={style.listBook}>
      <NavLink to={`/books/${props.book.category}/${props.book.id}`}>
        <div className={style.listBook__content}>
          <div className={style.listBook__content_image}>
            <img
              src={isLoadedImage ? props.book.image : bookWithoutPhoto}
              onError={() => {
                setIsLoadedImage(false);
              }}
              alt='bookImage'
            />
          </div>
          <div className={style.listBook__content_info}>
            <h2 className={style.listBook__content_title}>{props.book.title}</h2>
            <p className={style.listBook__content_author}>
              {props.book.author},{props.book.year}
            </p>
            <div className={style.listBook__content_ratingAndButton}>
              <Rating rating={props.book.rating} />
              <BookButton status={buttonStatus} />
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
