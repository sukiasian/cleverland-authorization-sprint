import { useForm } from 'react-hook-form';

import style from './auth.module.css'; 

export const Register = () => { 
	const { register } = useForm();
	const a = 5;

	return <form className={style.hello}> login </form> 
}