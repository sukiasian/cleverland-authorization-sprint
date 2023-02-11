import React from 'react';
import style from './footer.module.css';
import facebookIcon from '../../assets/images/icons/facebook.svg';
import instagramIcon from '../../assets/images/icons/instagram.svg';
import vkIcon from '../../assets/images/icons/vk.svg';
import inIcon from '../../assets/images/icons/in.svg';

export const Footer = () => (
  <footer className={style.footer}>
    <p className={style.footer__copyright}>© 2020-2023 Cleverland. Все права защищены.</p>
    <div className={style.footer__contacts}>
      <a className={style.footer__contacts_facebook}>
        <img src={facebookIcon} alt='facebook' />
      </a>
      <a className={style.footer__contacts_instagram}>
        <img src={instagramIcon} alt='facebook' />
      </a>
      <a className={style.footer__contacts_vk}>
        <img src={vkIcon} alt='facebook' />
      </a>
      <a className={style.footer__contacts_in}>
        <img src={inIcon} alt='facebook' />
      </a>
    </div>
  </footer>
);
