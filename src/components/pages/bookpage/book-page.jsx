import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
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

export const BookPage = () => {
  const { category, id } = useParams();
  const thisBook = books.find((el) => el.id === id);
  const bookCategoryName = navbarItems.find((el) => el.path === `/${category}`);
  const [isLoadedImage, setIsLoadedImage] = useState(true);
  const rateButton = { className: 'primary', text: 'Оценить книгу' };

  const [activeBookImage, setActiveBookImage] = useState(0);
  const [activeReviews, setActiveReviews] = useState(true);
  const toggleReviews = () => {
    setActiveReviews(!activeReviews);
  };
  const buttonStatus = useMemo(() => {
    if (thisBook.isBooked) {
      return { className: 'primary', text: 'Забронировать' };
    }
    if (thisBook.stock) {
      return { className: 'secondary', text: 'Забронировано' };
    }
    return { className: 'disabled', text: `занята до ${thisBook.bookedTill}` };
  }, [thisBook.isBooked, thisBook.stock, thisBook.bookedTill]);

  const windowWidth = ShowWindowDimensions().props.children[1];
  return (
    <section className={style.bookPage}>
      <div className={style.bookPage__breadcrumbs}>
        <Breadcrumbs path={bookCategoryName.path} title={bookCategoryName.title} bookTitle={thisBook.title} />
      </div>
      <div className={style.bookPage__container}>
        <div className={style.bookPage__information}>
          <div className={style.bookPage__information_image}>
            {thisBook.imagesForSlider ? (
              <>
                <img
                  data-test-id='slide-big'
                  className={style.bookPage__information_photo}
                  src={thisBook.imagesForSlider[activeBookImage]}
                  alt=''
                />
                <Slider
                  view={windowWidth < 801 ? 'circles' : ''}
                  setActiveBookImage={setActiveBookImage}
                  booksImage={thisBook.imagesForSlider}
                />
              </>
            ) : (
              <img
                data-test-id='slide-big'
                className={style.bookPage__information_photo}
                src={isLoadedImage ? thisBook.image : bookWithoutPhoto}
                onError={() => setIsLoadedImage(false)}
                alt='book'
              />
            )}
          </div>
          <div className={style.bookPage__information_description}>
            <p className={style.description__title}>{thisBook.title}</p>
            <p className={style.description__author}>{thisBook.author}</p>
            <div className={style.description__button}>
              <BookButton status={buttonStatus} />
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
  );
};
