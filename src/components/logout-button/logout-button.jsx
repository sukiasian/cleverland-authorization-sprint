import { useDispatch } from 'react-redux'

import { TextButton } from '../buttons/text-button/text-button'

export const LogoutButton = () => { 
	const dispatch = useDispatch();

	const logout = () => {
		// dispatch();
	}

	return <TextButton onClick={logout}>Выход</TextButton>
}