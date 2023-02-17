import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { changeActiveCategory, fetchCategories } from '../../redux/actions/actions';
import { navbarItems } from '../../assets/mocks';
import style from './burger-navigation.module.css';

export const BurgerNavigationContainer = (props) => {
  const { category, id } = useParams();
  const { pathname } = useLocation();
  const [isMenuListOpen, toggleListMenu] = useState(true);
  const toggleMenuListMode = () => {
    toggleListMenu(!isMenuListOpen);
  };
  useEffect(() => {
    props.fetchCategories();

    if (pathname === '/terms' || pathname === '/contract' || pathname === `/books/${category}/${id}`) {
      toggleListMenu(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(props.categories);
  return (
    <section
      role='button'
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onKeyDown={() => {}}
      data-test-id='burger-navigation'
      style={isMenuListOpen ? { height: '100vh' } : { height: '' }}
      className={props.isMenuOpen ? style.burgerNavigation : style.burgerNavigationClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMenuListMode();
        }}
        type='button'
        className={
          (isMenuListOpen === false && pathname === '/terms') || (isMenuListOpen === false && pathname === '/contract')
            ? style.burgerNavigation__title
            : style.burgerNavigation__active_title
        }
        data-test-id='burger-showcase'
      >
        Витрина книг
        <span
          style={
            (pathname === '/terms' && isMenuListOpen === false) ||
            (pathname === '/contract' && isMenuListOpen === false)
              ? { display: 'none' }
              : { display: 'inline-block' }
          }
          className={isMenuListOpen ? style.burgerNavigation__title_upArrow : style.burgerNavigation__title_downArrow}
        />
      </button>

      <ul className={isMenuListOpen ? style.burgerNavigation__list : style.burgerNavigation__list_close}>
        {props.categories.length !== 0 && (
          <NavLink
            onClick={() => {
              props.toggleMenu(false);
              props.changeActiveCategory('Все книги');
            }}
            className={`${category}` === 'all' ? style.burgerNavigation__list_active : ''}
            data-test-id='burger-books'
            to='/books/all'
          >
            Все книги
          </NavLink>
        )}

        {props.categories[0] &&
          props.categories[0].map((item) => (
            <li key={item.id} className={style.burgerNavigation__list_item}>
              <NavLink
                onClick={() => {
                  props.toggleMenu(false);
                  props.changeActiveCategory(item.name);
                }}
                className={`${category}` === item.path ? style.burgerNavigation__list_active : ''}
                to={`/books/${item.path}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
      </ul>

      <NavLink
        onClick={() => {
          props.toggleMenu(false);
        }}
        to='/terms'
        data-test-id='burger-terms'
        className={style.termsLink}
      >
        <p
          className={
            pathname === '/terms' && isMenuListOpen === false
              ? style.burgerNavigation__list_activeTerms
              : style.burgerNavigation__list_terms
          }
        >
          Правила пользования
        </p>
      </NavLink>
      <NavLink
        className={style.contractLink}
        onClick={() => {
          props.toggleMenu(false);
        }}
        to='/contract'
        data-test-id='burger-contract'
      >
        <p
          className={
            pathname === '/contract' && isMenuListOpen === false
              ? style.burgerNavigation__list_activeContract
              : style.burgerNavigation__list_contract
          }
        >
          Договор оферты
        </p>
      </NavLink>
      <div className={style.burgerNavigation__profileBlock}>
        <div className={style.burgerNavigation__profileBlock_line} />
        <div className={style.burgerNavigation__profileBlock_profile}>
          <NavLink to='/profile'>Профиль</NavLink>
        </div>
        <div className={style.burgerNavigation__profileBlock_logOut}>
          <NavLink to='/profile'>Выход</NavLink>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  categories: state.books.categories,
  books: state.books.books,
});
const mapDispatchToProps = {
  fetchCategories,
  changeActiveCategory,
};
export const BurgerNavigation = connect(mapStateToProps, mapDispatchToProps)(BurgerNavigationContainer);
