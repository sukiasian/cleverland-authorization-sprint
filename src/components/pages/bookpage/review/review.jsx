import React from 'react';
import { useSelector } from 'react-redux';
import { Rating } from '../../../rating';
import style from './review.module.css';
import withoutAvatar from '../../../../assets/images/bookWithoutPhoto.png';

export const Review = (props) => {
  const HOST = useSelector((state) => state.app.HOST);
  return (
    <div className={props.activeReviews ? style.reviewBlock : style.reviewBlockClose}>
      <div className={style.reviewBlock__user}>
        <div className={style.reviewBlock__user_image}>
          <img
            src={props.review.user.avatarUrl ? `${HOST}${props.review.user.avatarUrl}` : withoutAvatar}
            alt='User '
          />
        </div>
        <div className={style.reviewBlock__user_info}>
          <p className={style.info__name}>{props.review.user.firstName}</p>
          <p className={style.info__date}>{props.review.user.lastName}</p>
        </div>
      </div>
      <div className={style.reviewBlock__rating}>
        <Rating rating={props.review.rating} />
      </div>
      {props.review.text && <p className={style.reviewBlock__review}>{props.review.text}</p>}
    </div>
  );
};
