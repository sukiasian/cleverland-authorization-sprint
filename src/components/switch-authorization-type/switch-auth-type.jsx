import { Link } from 'react-router-dom';

import { CLIENT_URL_PATHNAMES } from '../../utils/url-pathnames';

import style from './switch-auth-type.module.css'

export const SwitchAuthType = () => {
	const renderData = {};

	if(window.location.hash.includes(CLIENT_URL_PATHNAMES.REGISTRATION)) { 
		renderData.switchTo = `/${CLIENT_URL_PATHNAMES.AUTH}`;
		renderData.controlQuestion = 'Есть учетная запись?';
		renderData.action = 'Войти'
	} else { 
		renderData.switchTo = `/${CLIENT_URL_PATHNAMES.REGISTRATION}`;
		renderData.controlQuestion = 'Нет учетной записи?';
		renderData.action = 'Регистрация'
	}

	return <div className={style['switch-auth-type']}>
		<p className={style.paragraph}>{renderData.controlQuestion}</p>
		<Link className='link link_plain-text' to={renderData.switchTo}>{renderData.action}</Link>
	</div>
}