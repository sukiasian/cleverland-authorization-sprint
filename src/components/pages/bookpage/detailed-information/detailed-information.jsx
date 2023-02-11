import React from 'react';
import style from './detailed-information.module.css';

export const DetailedInformation = () => (
  <div className={style.detailedInformation}>
    <p className={`${style.detailedInformation__title} ${style.subTitle}`}>Подробная информация</p>
    <div className={style.detailedInformation__body}>
      <div className={style.detailedInformation__body_left}>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Издательство</p>
          <p className={style.item__value}>Питер</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Год издания</p>
          <p className={style.item__value}>2019</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Страниц</p>
          <p className={style.item__value}>288</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Переплёт</p>
          <p className={style.item__value}>Мягкая обложка</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Формат</p>
          <p className={style.item__value}>70х100</p>
        </div>
      </div>
      <div className={style.detailedInformation__body_right}>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Жанр</p>
          <p className={style.item__value}>Компьютерная литература</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Вес</p>
          <p className={style.item__value}>370 г</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>ISBN</p>
          <p className={style.item__value}>978-5-4461-0923-4</p>
        </div>
        <div className={style.detailedInformation__body_item}>
          <p className={style.item__title}>Изготовитель</p>
          <p className={style.item__value}>
            ООО«Питер Мейл». РФ, 198206, г.Санкт-Петербург, Петергофское ш, д.73, лит. А29
          </p>
        </div>
      </div>
    </div>
  </div>
);
