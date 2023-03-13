import Lottie from 'react-lottie';

import * as animationData from '../../assets/loader.json'; 
import { ShowWindowDimensions } from '../show-window-dimensions';


export const LoadingSpin = () => { 
	const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  	const windowWidth = ShowWindowDimensions().props.children[1];

	return (
		<div className='loading-spin' data-test-id='loader'>
			<Lottie
				style={{ 
					position: 'absolute', 
					top: '50vh', 
					left: '50%', 
					transform: 'translate(-50%, -50%)' 
				}}
				options={defaultOptions}
				height={windowWidth < 910 ? 48 : 150}
				width={windowWidth < 910 ? 48 : 150}
			/>
		</div>
	)
}