import React, { useEffect, useState } from 'react';
import style from './search.module.css';
import whiteWindow from '../../assets/images/icons/whiteWindow.svg';
import window from '../../assets/images/icons/window.svg';
import list from '../../assets/images/icons/list.svg';
import whiteList from '../../assets/images/icons/whiteList.svg';
import search from '../../assets/images/icons/search.svg';
import action from '../../assets/images/icons/action.svg';
import { SearchInput } from './searchinput';
import { ShowWindowDimensions } from '../show-window-dimensions';
import { SortButton } from './sort-button/sort-button';

export const Search = (props) => {
  const buttons = [
    { id: 1, buttonMode: 'window', icon: window, activeIcon: whiteWindow },
    { id: 2, buttonMode: 'list', icon: list, activeIcon: whiteList },
  ];
  const [activeButton, setActiveButton] = useState(0);
  const [activeSearch, setActiveSearch] = useState(false);
  const width = ShowWindowDimensions().props.children[1];

  return activeSearch ? (
    <div className={style.searchWrapper__inputs_active}>
      <SearchInput
        setActiveSearch={setActiveSearch}
        status='active'
        image={search}
        placeholderValue='Поиск книги или автора…'
      />
    </div>
  ) : (
    <div className={style.searchWrapper}>
      <div className={style.searchWrapper__inputs}>
        <div className={style.searchWrapper__inputs_search}>
          <SearchInput
            setActiveSearch={width < 630 ? setActiveSearch : ''}
            status='notActive'
            image={search}
            placeholderValue='Поиск книги или автора…'
          />
        </div>
        <div className={style.searchWrapper__inputs_filter}>
          <SortButton books={props.sortBooks} icon={action} text='По рейтингу' />
        </div>
      </div>
      <div className={style.searchWrapper__buttons}>
        {buttons.map((button, index) => (
          <button
            key={button.id}
            data-test-id={index === 0 ? 'button-menu-view-window' : 'button-menu-view-list'}
            type='button'
            onClick={() => {
              setActiveButton(index);
              props.changeButtonMode(button.buttonMode);
            }}
            className={activeButton === index ? style.active : ''}
          >
            <img src={activeButton === index ? buttons[index].activeIcon : buttons[index].icon} alt='square' />
          </button>
        ))}
      </div>
    </div>
  );
};
