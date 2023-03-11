import { useDispatch } from 'react-redux'

import { setUserIsAuthorized } from '../../redux/actions/actions';
import { COOKIES_KEY, setCookieValue } from '../../utils/cookies';
import { TextButton } from '../buttons/text-button/text-button'

export const LogoutButton = () => {
	const dispatch = useDispatch();

	const logout = () => {
		setCookieValue(COOKIES_KEY.USER_IS_AUTHORIZED, null);

		dispatch(setUserIsAuthorized(false));
	}

	return <TextButton onClick={logout}>Выход</TextButton>
}