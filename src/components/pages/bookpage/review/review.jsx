import React from 'react';
import { Rating } from '../../../rating';
import style from './review.module.css';

export const Review = (props) => (
  <div className={props.activeReviews ? style.reviewBlock : style.reviewBlockClose}>
    <div className={style.reviewBlock__user}>
      <div className={style.reviewBlock__user_image}>
        <img src={props.review.photo} alt='User ' />
      </div>
      <div className={style.reviewBlock__user_info}>
        <p className={style.info__name}>{props.review.name}</p>
        <p className={style.info__date}>{props.review.date}</p>
      </div>
    </div>
    <div className={style.reviewBlock__rating}>
      <Rating rating={props.review.rating} />
    </div>
    {props.review.review && <p className={style.reviewBlock__review}>{props.review.review}</p>}
  </div>
);
