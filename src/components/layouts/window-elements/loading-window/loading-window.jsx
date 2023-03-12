import { useSelector } from 'react-redux';

import { LoadingSpin } from '../../../loading-spin'
import { DarkScreen } from '../../backgrounds/dark-screen'

export const LoadingWindow = () => {
	const { loadingSpinIsOpen } = useSelector((state) => state.app);

return loadingSpinIsOpen 
	? 
		<DarkScreen blured={true} data-test-id='loader'>
			<LoadingSpin />
		</DarkScreen>
	: 
		null;
}