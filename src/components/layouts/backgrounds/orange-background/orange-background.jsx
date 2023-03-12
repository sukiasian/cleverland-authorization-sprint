import { Outlet } from 'react-router-dom';

import textLogo from '../../../../assets/images/logo-text.svg'

import style from './orange-background.module.css';

export const OrangeBackground = () => 
	<div className={`background ${style.background_orange}`}>
		<img className='logo_text' src={textLogo} alt='text-logo' />
		<Outlet />
	</div>