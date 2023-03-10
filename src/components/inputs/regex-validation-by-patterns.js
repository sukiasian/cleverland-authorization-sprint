// 1. Валидация, возвращающая строку, перечисляющую ВСЕ ошибки (например, в случае с паролем, где сразу 3 проверки);
export const regexValidation = (getRegexErrorsObjectFunction) => (value) => { 
	const regexErrors = getRegexErrorsObjectFunction(value);

	const errorKeys = [];

	Object.keys(regexErrors).forEach((errorKey) => { 
		if(regexErrors[errorKey]) {
			errorKeys.push(errorKey);
		}
	});

	if (errorKeys.length === 0) {
		return true;
	}

	let errorsConsolidated = '';

	errorKeys.forEach((errorKey, i) => { 
		if (i === 0) { 
			errorsConsolidated += errorKey;
		} else { 
			errorsConsolidated += `,${errorKey}`;
		}
	})

	return errorsConsolidated;
}

// 2. Извлечение ошибок из строки, возвращаемой из regexValidation и возвращение названия класса для span с ошибкой;
export const getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray = (errors, field, errorName) => { 
	if(errors?.[field] && errors.field?.type === errorName) {
		return 'paragraph_red';
	}

	const errorsList = errors?.[field]?.message.split(',');
  
	let classname = '';
	
	if(errorsList?.includes(errorName)) { 
		classname = 'paragraph_red';
	}

	return classname;
}

export const emailRegexValidation = (value) => { 
	console.log(value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)?.length);

	
	return value.match(/^[\w-\.]+@([\w-.]+\.)+[\w-]{2,4}$/)?.length  > 0 ?? ''; // eslint-disable-line 
}