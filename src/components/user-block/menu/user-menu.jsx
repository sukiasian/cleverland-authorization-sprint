import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { LogoutButton } from '../../logout-button/logout-button'

export const UserMenu = () => { 
	const { userMenuIsOpen } = useSelector((state) => state.app);
	
	return userMenuIsOpen 
		?
			<div>
				<Link to=''>Профиль</Link>
				<LogoutButton />
			</div>
		: 
			null
}