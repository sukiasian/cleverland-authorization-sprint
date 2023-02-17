import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Lottie from 'react-lottie';
import * as animationData from '../../../assets/loader.json';
import { books, navbarItems, reviews } from '../../../assets/mocks';
import style from './book-page.module.css';
import { Breadcrumbs } from '../../breadcrumbs/breadcrumbs';
import bookWithoutPhoto from '../../../assets/images/bookWithoutPhoto.png';
import { DetailedInformation } from './detailed-information';
import { Review } from './review';
import { Rating } from '../../rating';
import { BookButton } from '../books/bookcard/bookbutton';
import { Slider } from '../../slider';
import { ShowWindowDimensions } from '../../show-window-dimensions';
import { changeActiveBookImage, fetchBook } from '../../../redux/actions/actions';
import { ErrorAlert } from '../../error-alert';

export const BookPageContainer = (props) => {
  const { category, id } = useParams();
  useEffect(() => {
    props.fetchBook(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };
  const loader = props.isLoading;
  const thisBook = props.book;

  const buttonStatus = () => {
    if (thisBook.delivery) {
      return { className: 'disabled', text: `занята до ${thisBook.delivery.dateHandedTo}` };
    }
    if (thisBook.booking) {
      return { className: 'secondary', text: 'Забронировано' };
    }
    return { className: 'primary', text: 'Забронировать' };
  };

  const rateButton = { className: 'primary', text: 'Оценить книгу' };
  const [activeReviews, setActiveReviews] = useState(true);
  const toggleReviews = () => {
    setActiveReviews(!activeReviews);
  };
  const windowWidth = ShowWindowDimensions().props.children[1];
  if (props.alert) {
    return (
      <div>
        <ErrorAlert text={props.alert} />
        <div className={style.bookPage__breadcrumbs_error}>
          <Breadcrumbs path={`/${category}`} title={props.activeCategory} bookTitle={props.activeTitle} />
        </div>
      </div>
    );
  }
  return loader ? (
    <div data-test-id='loader' className={style.bookPage__loaderBox}>
      <Lottie
        style={{ position: 'absolute', top: '50vh', left: '50%', transform: 'translate(-50%, -50%)' }}
        options={defaultOptions}
        height={windowWidth < 910 ? 48 : 150}
        width={windowWidth < 910 ? 48 : 150}
      />
    </div>
  ) : (
    thisBook && (
      <section className={style.bookPage}>
        <div className={style.bookPage__breadcrumbs}>
          <Breadcrumbs path={`/${category}`} title={props.book.categories[0]} bookTitle={props.book.title} />
        </div>
        <div className={style.bookPage__container}>
          <div className={style.bookPage__information}>
            <div className={style.bookPage__information_image}>
              {thisBook.images.length > 1 ? (
                <>
                  <img
                    data-test-id='slide-big'
                    className={style.bookPage__information_photo}
                    src={thisBook.images && `${props.HOST}${thisBook.images[props.activeBookImage].url}`}
                    alt=''
                  />
                  <Slider
                    view={windowWidth < 801 ? 'circles' : ''}
                    setActiveBookImage={props.changeActiveBookImage}
                    booksImage={thisBook.images}
                  />
                </>
              ) : (
                <img
                  data-test-id='slide-big'
                  className={style.bookPage__information_photo}
                  src={thisBook.images ? `${props.HOST}${thisBook.images[0].url}` : bookWithoutPhoto}
                  alt='book'
                />
              )}
            </div>
            <div className={style.bookPage__information_description}>
              <p className={style.description__title}>{thisBook.title}</p>
              <div className={style.bookPage__information_authorsBox}>
                {thisBook.authors.map((author, index) => (
                  <p key={author} className={style.description__author}>
                    {author}
                    {index === thisBook.authors.length - 1 ? '.' : ','}
                  </p>
                ))}
              </div>
              <div className={style.description__button}>
                <BookButton status={buttonStatus()} />
              </div>
            </div>
            <div className={style.bookPage__information_aboutBook}>
              <p className={`${style.aboutBook__title} ${style.subTitle}`}>О книге</p>
              <p className={style.aboutBook__description}>{thisBook.description}</p>
            </div>
          </div>
          <div className={style.bookPage__detailedInfo}>
            <div className={style.bookPage__detailedInfo_rating}>
              <p className={`${style.rating__title} ${style.subTitle}`}>Рейтинг</p>
              <div className={style.rating__stars}>
                <Rating size={windowWidth < 460 ? 'large' : ''} rating={thisBook.rating} />
                <span className={style.rating__stars_number}>{thisBook.rating}</span>
              </div>
            </div>
            <div className={style.bookPage__detailedInfoBox}>
              <DetailedInformation thisBookInfo={thisBook} />
            </div>
          </div>
          <div className={style.bookPage__reviews}>
            <p className={`${style.bookPage__reviews_title} ${style.subTitle}`}>
              Отзывы
              {thisBook.comments && <span className={style.bookPage__reviews_count}>{thisBook.comments.length}</span>}
              <button
                data-test-id='button-hide-reviews'
                className={style.bookPage__reviews_button}
                onClick={() => {
                  toggleReviews();
                }}
                type='button'
              >
                <span className={activeReviews ? style.bookPage__reviews_upArrow : style.bookPage__reviews_downArrow} />
              </button>
            </p>
            {thisBook.comments ? (
              thisBook.comments.map((comment) => (
                <Review activeReviews={activeReviews} key={comment.id} review={comment} />
              ))
            ) : (
              <span className={style.bookPage__reviews_noComments}> Комментарий пока нет </span>
            )}
          </div>
          <div data-test-id='button-rating' className={style.bookPage__rateButton}>
            <BookButton status={rateButton} />
          </div>
        </div>
      </section>
    )
  );
};
const mapStateToProps = (state) => ({
  activeCategory: state.books.activeCategory,
  book: state.book.book,
  activeTitle: state.book.activeBookTitle,
  activeBookImage: state.book.activeBookImage,
  isLoading: state.app.isLoading,
  alert: state.app.alert,
  HOST: state.app.HOST,
});
const mapDispatchToProps = {
  changeActiveBookImage,
  fetchBook,
};
export const BookPage = connect(mapStateToProps, mapDispatchToProps)(BookPageContainer);
