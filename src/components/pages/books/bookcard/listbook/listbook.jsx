import React, { useCallback, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import style from './listbook.module.css';
import bookWithoutPhoto from '../../../../../assets/images/bookWithoutPhoto.png';
import { Rating } from '../../../../rating';
import { BookButton } from '../bookbutton';
import { changeActiveBookTitle, fetchBook } from '../../../../../redux/actions/actions';
import { HightLight } from '../../../../hightlight';

export const ListBookContainer = (props) => {
  const buttonStatus = useMemo(() => {
    if (props.book.delivery) {
      return { className: 'disabled', text: `занята до ${props.book.delivery.dateHandedTo}` };
    }
    if (props.book.booking) {
      return { className: 'secondary', text: 'Забронировано' };
    }
    return { className: 'primary', text: 'Забронировать' };
  }, [props.book.delivery, props.book.booking]);
  const [isLoadedImage, setIsLoadedImage] = useState(true);
  const light = useCallback(
    (str) => <HightLight filter={props.booksSearchValue} str={str} />,
    [props.booksSearchValue]
  );
  return (
    <div className={style.listBook}>
      <NavLink
        onClick={() => {
          props.fetchBook(props.book.id);
          props.changeActiveBookTitle(props.book.title);
        }}
        to={`/books/${props.book.category}/${props.book.id}`}
      >
        <div className={style.listBook__content}>
          <div className={style.listBook__content_image}>
            <img
              src={props.book.image ? `${props.HOST}${props.book.image.url}` : bookWithoutPhoto}
              onError={() => {
                setIsLoadedImage(false);
              }}
              alt='bookImage'
            />
          </div>
          <div className={style.listBook__content_info}>
            <h2 data-test-id='book-title' className={style.listBook__content_title}>
              <span data-test-id='book-name'>{light(props.book.title)}</span>
            </h2>
            <p className={style.listBook__content_author}>
              {props.book.authors.map((author) => (
                <span key={author} className={style.authorName}>
                  {author},
                </span>
              ))}
              <span className={style.bookYear}>{props.book.issueYear}</span>
            </p>
            <div className={style.listBook__content_ratingAndButton}>
              <Rating rating={props.book.rating} />
              <BookButton status={buttonStatus} />
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
const mapStateToProps = (state) => ({
  booksSearchValue: state.books.booksSearchValue,
  HOST: state.app.HOST,
});
const mapDispatchToProps = {
  changeActiveBookTitle,
  fetchBook,
};
export const ListBook = connect(mapStateToProps, mapDispatchToProps)(ListBookContainer);
