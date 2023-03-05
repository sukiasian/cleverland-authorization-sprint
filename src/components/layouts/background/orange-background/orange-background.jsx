import style from './orange-background.module.css';

export const OrangeBackground = ({ children }) => <div className={`${style.background} ${style['background--orange']}`}>
		{children}
	</div>