import style from './status-block.module.css';

export const StatusBlock = ({ renderingCondition, heading, paragraph}) => {
	const a = 5;
	
	return renderingCondition 
		?
			(
				<div className={style['status-block']}>
					<h2 className={`${style.heading} ${style.heading_secondary}`}>{heading}</h2>
					<p className={style.paragraph}>{paragraph}</p>
				</div>
			)
		: null;
}