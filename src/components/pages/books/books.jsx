import React, { useMemo, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import style from './books.module.css';
import { books } from '../../../assets/mocks';
import { Book } from './bookcard/windowbook/windowbook';
import { ListBook } from './bookcard/listbook';
import { Search } from '../../search';

export const Books = () => {
  const [buttonMode, setButtonMode] = useState('window');
  const changeButtonMode = (mode) => {
    setButtonMode(mode);
  };
  const { category } = useParams();
  const filterBooks = useMemo(
    () => (category === 'all' ? books : books.filter((el) => el.category === category)),
    [category]
  );

  return (
    <div className='app-wrapper__content'>
      <div className={style.books}>
        <Search changeButtonMode={changeButtonMode} />
        <div className={buttonMode === 'window' ? style.books__container_window : style.books__container_list}>
          {filterBooks.map((book) =>
            buttonMode === 'window' ? <Book key={book.id} book={book} /> : <ListBook key={book.id} book={book} />
          )}
        </div>
      </div>
    </div>
  );
};
