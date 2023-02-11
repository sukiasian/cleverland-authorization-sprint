import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { navbarItems } from '../../assets/mocks';
import style from './navigation.module.css';

export const Navigation = () => {
  const { category } = useParams();
  const { pathname } = useLocation();
  const [isMenuOpen, toggleMenu] = useState(true);
  const toggleMenuMode = () => {
    toggleMenu(!isMenuOpen);
  };
  useEffect(() => {
    if (pathname === '/terms' || pathname === '/contract') {
      toggleMenu(false);
    }
  }, [pathname]);
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
        {navbarItems.map((item) => (
          <li key={item.id} className={style.navbar__list_item}>
            <NavLink
              data-test-id={item.id === 1 ? 'navigation-books' : ''}
              className={`/${category}` === item.path ? style.navbar__list_active : ''}
              to={`/books${item.path}`}
            >
              {item.title}
              <span>{item.count}</span>
            </NavLink>
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
