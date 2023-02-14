import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Lottie from 'react-lottie';
import * as animationData from '../../../assets/loader.json';
import style from './books.module.css';
import { Book } from './bookcard/windowbook/windowbook';
import { ListBook } from './bookcard/listbook';
import { Search } from '../../search';
import { fetchBooks, fetchCategories, hideAlert } from '../../../redux/actions/actions';
import { ShowWindowDimensions } from '../../show-window-dimensions';
import { ErrorAlert } from '../../error-alert';

const BooksContainer = (props) => {
  useEffect(() => {
    props.fetchBooks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loader = props.isLoading;
  const [buttonMode, setButtonMode] = useState('window');
  const { category } = useParams();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };
  const changeButtonMode = (mode) => {
    setButtonMode(mode);
  };
  // const filterBooks = useMemo(
  //   () => (category === 'all' ? books : books.filter((el) => el.category === category)),
  //   [category]
  // );
  const windowWidth = ShowWindowDimensions().props.children[1];

  return props.alert ? (
    <ErrorAlert text={props.alert} />
  ) : (
    <div className='app-wrapper__content'>
      <div className={style.books}>
        <Search changeButtonMode={changeButtonMode} />
        <div className={buttonMode === 'window' ? style.books__container_window : style.books__container_list}>
          {loader ? (
            <div className={style.books__loaderBox}>
              <Lottie
                style={{ position: 'absolute', top: '50vh', left: '50%', transform: 'translate(-50%, -50%)' }}
                options={defaultOptions}
                height={windowWidth < 910 ? 48 : 150}
                width={windowWidth < 910 ? 48 : 150}
              />
            </div>
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
  alert: state.app.alert,
});
const mapDispatchToProps = {
  fetchBooks,
  hideAlert,
};

export const Books = connect(mapStateToProps, mapDispatchToProps)(BooksContainer);
