import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Lottie from 'react-lottie';
import * as animationData from '../../../assets/loader.json';
import style from './books.module.css';
import { Book } from './bookcard/windowbook/windowbook';
import { ListBook } from './bookcard/listbook';
import { Search } from '../../search';
import { fetchBooks, hideAlert, sortDescending } from '../../../redux/actions/actions';
import { ShowWindowDimensions } from '../../show-window-dimensions';
import { ErrorAlert } from '../../error-alert';
import { NoBooks } from '../../no-books';

const BooksContainer = (props) => {
  useEffect(() => {
    props.fetchBooks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sortBooks = useMemo(
    () =>
      props.activeCategory === 'Все книги'
        ? props.books[0] &&
          props.books[0].sort((a, b) => {
            let result = '';
            if (b.rating === 0) {
              result = b.rating + 0.1;
            } else {
              result = b.rating;
            }
            return a.rating - result;
          })
        : props.books[0] && props.books[0].filter((el) => el.categories[0] === props.activeCategory),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.activeCategory, props.books[0]]
  );

  const loader = props.isLoading;
  const [buttonMode, setButtonMode] = useState('window');
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };
  const changeButtonMode = (mode) => {
    setButtonMode(mode);
  };
  const searchFilterBooks = useMemo(
    () =>
      props.booksSearchValue.length
        ? sortBooks &&
          sortBooks.filter((book) => book.title.toLowerCase().includes(props.booksSearchValue.toLowerCase()))
        : sortBooks && sortBooks,
    [props.booksSearchValue, sortBooks]
  );
  const filterBooks = searchFilterBooks && searchFilterBooks.reverse();
  const windowWidth = ShowWindowDimensions().props.children[1];
  console.log(filterBooks);
  return props.alert ? (
    <ErrorAlert text={props.alert} />
  ) : (
    <div className='app-wrapper__content'>
      <div className={style.books}>
        <Search sortBooks={searchFilterBooks && searchFilterBooks} changeButtonMode={changeButtonMode} />
        {!props.booksSearchValue.length && searchFilterBooks && !searchFilterBooks.length && (
          <NoBooks text='В этой категории книг ещё нет' />
        )}
        {props.booksSearchValue.length > 0 && searchFilterBooks && !searchFilterBooks.length && (
          <NoBooks text='По запросу ничего не найдено' />
        )}
        <div className={buttonMode === 'window' ? style.books__container_window : style.books__container_list}>
          {loader ? (
            <div data-test-id='loader' className={style.books__loaderBox}>
              <Lottie
                style={{ position: 'absolute', top: '50vh', left: '50%', transform: 'translate(-50%, -50%)' }}
                options={defaultOptions}
                height={windowWidth < 910 ? 48 : 150}
                width={windowWidth < 910 ? 48 : 150}
              />
            </div>
          ) : (
            searchFilterBooks &&
            searchFilterBooks.map((book) =>
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
  sortButton: state.books.sortButton,
  sortBooks: state.books.sortBooks,
  activeCategory: state.books.activeCategory,
  categories: state.books.categories,
  isLoading: state.app.isLoading,
  alert: state.app.alert,
  booksSearchValue: state.books.booksSearchValue,
  filterBooks: state.books.filterBooks,
});
const mapDispatchToProps = {
  sortDescending,
  fetchBooks,
  hideAlert,
};

export const Books = connect(mapStateToProps, mapDispatchToProps)(BooksContainer);
