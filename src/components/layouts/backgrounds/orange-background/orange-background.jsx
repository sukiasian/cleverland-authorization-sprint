import { Outlet } from 'react-router-dom';

import style from './orange-background.module.css';

export const OrangeBackground = () => 
	<div className={`${style.background} ${style.background_orange}`}>
		<Outlet />
	</div>