import { useDispatch } from 'react-redux';

import avatar from '../../assets/images/avatar.png';
import { toggleUserMenu } from '../../redux/actions/actions';

import { UserMenu } from './menu/user-menu';

import style from './user-block.module.css';

export const UserBlock = () => {	
	const dispatch = useDispatch();

	const toggleMenu = () => { 
		dispatch(toggleUserMenu());
	}

	return (
		<div className={style.header__isAuthBlock}>
			<button type='button' onClick={toggleMenu}>
				<p className={style.header__isAuthBlock_greetings}>Привет, Иван!</p>
				<img src={avatar} alt='avatar' />
			</button>
			<UserMenu />
		</div> 
	)
	
}