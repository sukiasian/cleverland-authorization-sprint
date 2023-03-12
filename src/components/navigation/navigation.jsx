import { useEffect,useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';

import { changeActiveCategory, changeSortIcon, fetchCategories, sortDescending } from '../../redux/actions/actions';
import { LogoutButton } from '../logout-button/logout-button';

import style from './navigation.module.css';

export const Navigation = () => {
	const { books, categories } = useSelector((state) => state.books);

	const { category } = useParams();
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const [isMenuOpen, toggleMenu] = useState(true);
	const toggleMenuMode = () => {
		toggleMenu(!isMenuOpen);
	};

	useEffect(() => {
		dispatch(fetchCategories());

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
        {categories.length !== 0 && (
          <NavLink
            data-test-id='navigation-books'
            onClick={() => {
              dispatch(changeActiveCategory('Все книги'));
              dispatch(changeSortIcon());
            }}
            className={`${category}` === 'all' ? style.navbar__list_active : ''}
            to='/books/all'
          >
            Все книги
          </NavLink>
        )}
        {categories[0] &&
          categories[0].map((item) => (
            <li key={item.id} className={style.navbar__list_item}>
              <NavLink
                data-test-id={`navigation-${item.path}`}
                onClick={() => {
                  dispatch(changeActiveCategory(item.name));
                  dispatch(changeSortIcon());
                }}
                className={`${category}` === item.path ? style.navbar__list_active : ''}
                to={`/books/${item.path}`}
              >
                {item.name}
              </NavLink>
              <span data-test-id={`navigation-book-count-for-${item.path}`}>
                {books[0] && books[0].filter((book) => book.categories[0] === item.name).length}
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
	  <LogoutButton />
    </section>
  );
};
// const mapStateToProps = (state) => ({
//   categories: state.books.categories,
//   books: state.books.books,
// });
// const mapDispatchToProps = {
//   changeSortIcon,
//   sortDescending,
//   fetchCategories,
//   changeActiveCategory,
// };

// export const Navigation = connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
