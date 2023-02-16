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
  console.log(thisBook);
  // const buttonStatus = useMemo(() => {
  //   if (props.book.delivery) {
  //     return { className: 'disabled', text: `занята до ${props.book.delivery.dateHandedTo}` };
  //   }
  //   if (props.book.booking) {
  //     return { className: 'secondary', text: 'Забронировано' };
  //   }
  //   return { className: 'primary', text: 'Забронировать' };
  // }, [props.book.delivery, props.book.booking]);
  // const bookCategoryName = navbarItems.find((el) => el.path === `/${category}`);
  // const [isLoadedImage, setIsLoadedImage] = useState(true);
  const rateButton = { className: 'primary', text: 'Оценить книгу' };
  // const [activeBookImage, setActiveBookImage] = useState(0);
  const [activeReviews, setActiveReviews] = useState(true);
  const toggleReviews = () => {
    setActiveReviews(!activeReviews);
  };
  const windowWidth = ShowWindowDimensions().props.children[1];
  return loader ? (
    <div className={style.bookPage__loaderBox}>
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
          <Breadcrumbs path={`/${category}`} title={props.book.categories[0]} bookTitle={thisBook.title} />
        </div>
        <div className={style.bookPage__container}>
          <div className={style.bookPage__information}>
            <div className={style.bookPage__information_image}>
              {thisBook.images.length > 1 ? (
                <>
                  <img
                    data-test-id='slide-big'
                    className={style.bookPage__information_photo}
                    src={`https://strapi.cleverland.by${thisBook.images[props.activeBookImage].url}`}
                    alt=''
                  />
                  <Slider
                    view={windowWidth < 801 ? 'circles' : ''}
                    setActiveBookImage={props.changeActiveBookImage()}
                    booksImage={thisBook.images}
                  />
                </>
              ) : (
                <img
                  data-test-id='slide-big'
                  className={style.bookPage__information_photo}
                  src={thisBook.images ? `https://strapi.cleverland.by${thisBook.images[0].url}` : bookWithoutPhoto}
                  alt='book'
                />
              )}
            </div>
            <div className={style.bookPage__information_description}>
              <p className={style.description__title}>{thisBook.title}</p>
              {thisBook.authors.map((author, index) => (
                <p className={style.description__author}>
                  {author}
                  {index === thisBook.authors.length - 1 ? '.' : ','}
                </p>
              ))}
              <div className={style.description__button}>{/* <BookButton status={buttonStatus} /> */}</div>
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
              <DetailedInformation />
            </div>
          </div>
          <div className={style.bookPage__reviews}>
            <p className={`${style.bookPage__reviews_title} ${style.subTitle}`}>
              Отзывы <span className={style.bookPage__reviews_count}>{reviews.length}</span>
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
            {reviews.map((review) => (
              <Review activeReviews={activeReviews} key={review.id} review={review} />
            ))}
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
  book: state.book.book,
  activeBookImage: state.book.activeBookImage,
  isLoading: state.app.isLoading,
});
const mapDispatchToProps = {
  changeActiveBookImage,
  fetchBook,
};
export const BookPage = connect(mapStateToProps, mapDispatchToProps)(BookPageContainer);
