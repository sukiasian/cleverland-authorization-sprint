import React from 'react';
import { Footer } from '../../footer';
import { Header } from '../../header';
import { BookPage } from '../../pages/bookpage';

import style from './book-page.module.css';

export const LayoutBookPage = () => (
  <div className={style.layoutBookPage}>
    <div className={style.header}>
      <Header />
    </div>
    <div className={style.main}>
      <BookPage />
    </div>
    <div className={style.footer}>
      <Footer />
    </div>
  </div>
);
