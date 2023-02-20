import React from 'react';
import style from './no-books.module.css';

export const NoBooks = (props) => <p className={style.text}>{props.text}</p>;
