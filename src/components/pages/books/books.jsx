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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [buttonMode, setButtonMode] = useState('window');
  const { category } = useParams();
  const loader = props.isLoading;

  const changeButtonMode = (mode) => {
    setButtonMode(mode);
  };
  // const filterBooks = useMemo(
  //   () => (category === 'all' ? books : books.filter((el) => el.category === category)),
  //   [category]
  // );
  console.log(props.isLoading);
  console.log(props.books);
  return (
    <div className='app-wrapper__content'>
      <div className={style.books}>
        <Search changeButtonMode={changeButtonMode} />
        <div className={buttonMode === 'window' ? style.books__container_window : style.books__container_list}>
          {props.isLoading ? (
            <h1>ИДЁТ ЗАГРУЗА</h1>
          ) : (
            props.books[0].map((book) =>
              buttonMode === 'window' ? <Book key={book.id} book={book} /> : <ListBook key={book.id} book={book} />
            )
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  books: state.books.books,
  isLoading: state.app.isLoading,
});
const mapDispatchToProps = {
  fetchBooks,
};

export const Books = connect(mapStateToProps, mapDispatchToProps)(Bookss);
