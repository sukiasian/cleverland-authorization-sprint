import { Link } from 'react-router-dom';

import style from './switch-auth-type.module.css'

export const SwitchAuthType = () => {
	const renderData = {};

	if(window.location.hash.includes('/register')) { 
		renderData.switchTo = '/auth';
		renderData.controlQuestion = 'Есть учетная запись?';
		renderData.action = 'Войти'
	} else { 
		renderData.switchTo = '/register';
		renderData.controlQuestion = 'Нет учетной записи?';
		renderData.action = 'Регистрация'
	}

	return <div className={style['switch-auth-type']}>
		<p className={style.paragraph}>{renderData.controlQuestion}</p>
		<Link className='link link_plain-text' to={renderData.switchTo}>{renderData.action}</Link>
	</div>
}