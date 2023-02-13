import React, { Fragment } from 'react';
import style from './rating.module.css';
import star from '../../assets/images/star.png';

export const Rating = (props) =>
  !props.rating && props.rating !== 0 ? (
    props.size === 'large' ? (
      <div className={style.withoutRating}>
        <div className={style.stars__large}>
          <div className={style.star__large} />
          <div className={style.star__large} />
          <div className={style.star__large} />
          <div className={style.star__large} />
          <div className={style.star__large} />
        </div>
        <p className={style.noRating}>ещё нет оценок</p>
      </div>
    ) : (
      <p className={style.noRating}>ещё нет оценок</p>
    )
  ) : (
    <div
      className={props.size === 'large' ? style.rating__large : style.rating}
      data-total-value={Math.round(props.rating)}
    >
      <div className={props.size === 'large' ? style.rating__item_large : style.rating__item} data-item-value='5' />
      <div className={props.size === 'large' ? style.rating__item_large : style.rating__item} data-item-value='4' />
      <div className={props.size === 'large' ? style.rating__item_large : style.rating__item} data-item-value='3' />
      <div className={props.size === 'large' ? style.rating__item_large : style.rating__item} data-item-value='2' />
      <div className={props.size === 'large' ? style.rating__item_large : style.rating__item} data-item-value='1' />
    </div>
  );
