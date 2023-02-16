import React from 'react';
import { Rating } from '../../../rating';
import style from './review.module.css';
import withoutAvatar from '../../../../assets/images/bookWithoutPhoto.png';

export const Review = (props) => (
  <div className={props.activeReviews ? style.reviewBlock : style.reviewBlockClose}>
    <div className={style.reviewBlock__user}>
      <div className={style.reviewBlock__user_image}>
        <img
          src={
            props.review.user.avatarUrl ? `https://strapi.cleverland.by${props.review.user.avatarUrl}` : withoutAvatar
          }
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
