import React from 'react';
import style from './detailed-information.module.css';

export const DetailedInformation = (props) => (
  <div className={style.detailedInformation}>
    <p className={`${style.detailedInformation__title} ${style.subTitle}`}>Подробная информация</p>
    <div className={style.detailedInformation__body}>
      <div className={style.detailedInformation__body_left}>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Издательство</p>
          <p className={style.item__value}>{props.thisBookInfo.publish}</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Год издания</p>
          <p className={style.item__value}>{props.thisBookInfo.issueYear}</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Страниц</p>
          <p className={style.item__value}>{props.thisBookInfo.pages}</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Переплёт</p>
          <p className={style.item__value}>{props.thisBookInfo.cover}</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Формат</p>
          <p className={style.item__value}>{props.thisBookInfo.format}</p>
        </div>
      </div>
      <div className={style.detailedInformation__body_right}>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Жанр</p>
          <p className={style.item__value}>{props.thisBookInfo.categories}</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Вес</p>
          <p className={style.item__value}>{props.thisBookInfo.weight} г</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>ISBN</p>
          <p className={style.item__value}>{props.thisBookInfo.ISBN}</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Изготовитель</p>
          <p className={style.item__value}>{props.thisBookInfo.producer}</p>
        </div>
      </div>
    </div>
  </div>
);
