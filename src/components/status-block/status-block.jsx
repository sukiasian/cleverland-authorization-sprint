import { RoundedButton } from '../buttons/rounded-button';

import style from './status-block.module.css';

export const StatusBlock = ({ heading, paragraph, buttonOrLinkComponent}) => (
	<div className={style['status-block']}>
		<h2 className={`${style.heading} ${style.heading_secondary}`}>{heading}</h2>
		<p className={style.paragraph}>{paragraph}</p>
		{ buttonOrLinkComponent }
	</div>
)