import style from './authentication-window.module.css';

export const AuthenticationWindow = (
	{ 
		topChildren, 
		bottomChildren, 
		form, 
		heading, 
		paragraph 
	}
) => (
	<div className={`window window_white ${style.window_authentication}`}>
		{ topChildren }
		<h2> {heading} </h2>
		{ paragraph ? <p className='paragraph paragraph_primary'>{paragraph}</p> : null}
		{ form }
		{ bottomChildren }
	</div>
);