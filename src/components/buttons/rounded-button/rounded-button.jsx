import style from './rounded-button.module.css';

export const RoundedButton = ({ children, isAvailable, submit, onClick }) => (
	<button 
		type={ submit ? 'submit' : 'button' } 
		className={`
			${style.button_rounded} ${isAvailable ? 'button_available' : 'button_unavailable'}`
		} 
		onClick={ onClick || null }
	> 
		{children} 
	</button>
);