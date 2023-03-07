import { Link } from 'react-router-dom';

import arrowLeftIcon from '../../assets/images/icons/arrow-left.svg'

export const GoBackBar = ({ text }) => (
		<div className="">
			<Link to='/auth'>
				<img src={arrowLeftIcon} alt='go-back' />
			</Link>
			<p>{text}</p>
		</div>
	)