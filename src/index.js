import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import { Books } from './components/pages/books';
import { MainLayout } from './components/layouts/main/main';
import { NavigationLayout } from './components/layouts/navigation';
import { LayoutTerms } from './components/layouts/terms/terms';
import { LayoutBookPage } from './components/layouts/book-page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route element={<NavigationLayout />}>
              <Route path='/' element={<Navigate to='/books/all' />} />
              <Route path='/books/:category' element={<Books />} />
              <Route path='/terms' element={<LayoutTerms contentView='terms' />} />
              <Route path='/contract' element={<LayoutTerms contentView='contract' />} />
            </Route>
          </Route>
          <Route path='/books/:category/:id' element={<LayoutBookPage />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
