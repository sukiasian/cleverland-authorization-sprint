import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import { Navigation } from '../navigation';
import { BurgerNavigation } from '../navigation-for-burger';
import { UserBlock } from '../user-block/user-block';

import style from './header.module.css';

export const Header = () => {
  const [isMenuOpen, toggleMenu] = useState(false);
  const toggleMenuMode = () => {
    toggleMenu(!isMenuOpen);
  };

  document.body.addEventListener('click', () => {
    toggleMenu(false);
  });
  useEffect(() => {
    const lockPage = isMenuOpen ? (document.body.className = 'lockPage') : (document.body.className = '');
  }, [isMenuOpen]);

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.header__info}>
          <NavLink className={style.header__info_logo} to='/'>
            <img src={logo} alt='logo' />
          </NavLink>
          <button
            data-test-id='button-burger'
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              toggleMenuMode();
            }}
            className={style.header__burger}
          >
            {isMenuOpen ? (
              <div className={style.header__burger_active} />
            ) : (
              <React.Fragment>
                <span className={style.header__burger_line} />
                <span className={style.header__burger_line} />
                <span className={style.header__burger_line} />
              </React.Fragment>
            )}
          </button>
          <BurgerNavigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <h1 className={style.header__info_title}>Библиотека</h1>
        </div>
        <UserBlock />
      </div>
    </header>
  );
};
