import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LayoutBookPage } from './components/layouts/book-page';
import { MainLayout } from './components/layouts/main/main';
import { NavigationLayout } from './components/layouts/navigation';
import { LayoutTerms } from './components/layouts/terms/terms';
import { Books } from './components/pages/books';
import { store } from './redux/store';
import { App } from './app';

import './index.css';


/* 
Если пользователь авторизован, при попытке перехода на какой либо из роутов авторизации, 
происходит редирект на главную страницу. И наоборот, при попытке перехода на главную 
страницу неавторизованного пользователя, происходит редирект на страницу авторизации.


*/

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Provider store={store}>
    <HashRouter >
			<App />
    </HashRouter>
  </Provider>
);
