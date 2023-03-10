import style from './rounded-button.module.css';

export const RoundedButton = ({ children, isAvailable, submit, onClick }) => (
	<button 
		type={ submit ? 'submit' : 'button' } 
		className={ isAvailable ? 'button_available' : 'button_unavailable' } 
		onClick={ onClick }
	> 
		{children} 
	</button>
);