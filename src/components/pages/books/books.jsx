import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './books.module.css';
import { Book } from './bookcard/windowbook/windowbook';
import { ListBook } from './bookcard/listbook';
import { Search } from '../../search';
import { fetchBooks } from '../../../redux/actions/actions';

const Bookss = (props) => {
  useEffect(() => {
    props.fetchBooks();
  });
  const { books } = props.books;
  console.log(books);
  const [buttonMode, setButtonMode] = useState('window');
  const changeButtonMode = (mode) => {
    setButtonMode(mode);
  };
  const { category } = useParams();
  // const filterBooks = useMemo(
  //   () => (category === 'all' ? books : books.filter((el) => el.category === category)),
  //   [category]
  // );
  console.log(props);
  return (
    <div className='app-wrapper__content'>
      <div className={style.books}>
        <Search changeButtonMode={changeButtonMode} />
        <div className={buttonMode === 'window' ? style.books__container_window : style.books__container_list}>
          {/* {filterBooks.map((book) =>
            buttonMode === 'window' ? <Book key={book.id} book={book} /> : <ListBook key={book.id} book={book} />
          )} */}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  books: state.books,
});
const mapDispatchToProps = {
  fetchBooks,
};

export const Books = connect(mapStateToProps, mapDispatchToProps)(Bookss);
