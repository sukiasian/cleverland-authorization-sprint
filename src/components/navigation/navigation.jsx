import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { changeActiveCategory, changeSortIcon, fetchCategories, sortDescending } from '../../redux/actions/actions';
import style from './navigation.module.css';

export const NavigationContainer = (props) => {
  const { category } = useParams();
  const { pathname } = useLocation();
  const [isMenuOpen, toggleMenu] = useState(true);
  const toggleMenuMode = () => {
    toggleMenu(!isMenuOpen);
  };
  useEffect(() => {
    props.fetchCategories();

    if (pathname === '/terms' || pathname === '/contract') {
      toggleMenu(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={style.navbar}>
      <button
        onClick={() => {
          toggleMenuMode();
        }}
        type='button'
        className={
          (isMenuOpen === false && pathname === '/terms') || (isMenuOpen === false && pathname === '/contract')
            ? style.navbar__title
            : style.navbar__active_title
        }
        data-test-id='navigation-showcase'
      >
        Витрина книг{' '}
        <span
          style={
            (pathname === '/terms' && isMenuOpen === false) || (pathname === '/contract' && isMenuOpen === false)
              ? { display: 'none' }
              : { display: 'inline-block' }
          }
          className={isMenuOpen ? style.navbar__title_upArrow : style.navbar__title_downArrow}
        />
      </button>
      <ul className={isMenuOpen ? style.navbar__list : style.navbar__active}>
        {props.categories.length !== 0 && (
          <NavLink
            data-test-id='navigation-books'
            onClick={() => {
              props.changeActiveCategory('Все книги');
              props.changeSortIcon();
            }}
            className={`${category}` === 'all' ? style.navbar__list_active : ''}
            to='/books/all'
          >
            Все книги
          </NavLink>
        )}
        {props.categories[0] &&
          props.categories[0].map((item) => (
            <li key={item.id} className={style.navbar__list_item}>
              <NavLink
                data-test-id={`navigation-${item.path}`}
                onClick={() => {
                  props.changeActiveCategory(item.name);
                  props.changeSortIcon();
                }}
                className={`${category}` === item.path ? style.navbar__list_active : ''}
                to={`/books/${item.path}`}
              >
                {item.name}
              </NavLink>
              <span data-test-id={`navigation-book-count-for-${item.path}`}>
                {props.books[0] && props.books[0].filter((book) => book.categories[0] === item.name).length}
              </span>
            </li>
          ))}
      </ul>

      <NavLink data-test-id='navigation-terms' to='/terms'>
        <p className={pathname === '/terms' ? style.navbar__list_activeTerms : style.navbar__list_terms}>
          Правила пользования
        </p>
      </NavLink>
      <NavLink data-test-id='navigation-contract' to='/contract'>
        <p className={pathname === '/contract' ? style.navbar__list_activeTerms : style.navbar__list_terms}>
          Договор оферты
        </p>
      </NavLink>
    </section>
  );
};
const mapStateToProps = (state) => ({
  categories: state.books.categories,
  books: state.books.books,
});
const mapDispatchToProps = {
  changeSortIcon,
  sortDescending,
  fetchCategories,
  changeActiveCategory,
};
export const Navigation = connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
