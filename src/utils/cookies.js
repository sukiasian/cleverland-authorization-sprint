export const COOKIES_KEY = { 
	JWT: 'jwt',
	USER_IS_AUTHORIZED: 'userIsAuthorized'
}

export const setCookieValue = (name, value, daysToExpire) => { 
	let expires = '';
	
	if(daysToExpire) { 
		const date = new Date();
		
		date.setTime(date.getTime() + (daysToExpire * 24 * 3600 * 60 * 60));
		
		expires = `expires=${date.toUTCString()};`;
	}
	
	document.cookie = `${name}=${value || ''}; ${expires} Secure`
}

export const extractCookieValue = (keyWithoutEqualsSign) => document.cookie.split('; ').find((row) => row.startsWith(`${keyWithoutEqualsSign}=`))?.split('=')[1];