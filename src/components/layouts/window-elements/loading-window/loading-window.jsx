import { useSelector } from 'react-redux';

import { LoadingSpin } from '../../../loading-spin'
import { DarkScreen } from '../dark-screen'

export const LoadingWindow = () => {
	const { loadingSpinIsOpen } = useSelector((state) => state.app);

return loadingSpinIsOpen 
	? 
		<DarkScreen>
			<LoadingSpin />
		</DarkScreen>
	: 
		null;
}