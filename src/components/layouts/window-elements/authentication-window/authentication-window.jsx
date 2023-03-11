import style from './authentication-window.css';

export const AuthenticationWindow = (
	{ 
		topChildren, 
		bottomChildren, 
		form, 
		heading, 
		paragraph 
	}
) => (
	<div className={`${style.window} ${style['authentication-window']}`}>
		{ topChildren }
		<h2 className={`${style.heading} ${style.heading_secondary}`}>{/* или использовать без style.<> а напрямую heading heading_secondary */} {heading} </h2>
		{ paragraph ? <p className='paragraph paragraph_primary'>{paragraph}</p> : null}
		{ form }
		{ bottomChildren }
	</div>
);