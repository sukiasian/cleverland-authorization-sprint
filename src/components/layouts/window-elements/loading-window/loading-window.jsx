import { LoadingSpin } from '../../../loading-spin'
import { DarkScreen } from '../dark-screen'

export const LoadingWindow = () => (
	<DarkScreen>
		<LoadingSpin />
	</DarkScreen>
);