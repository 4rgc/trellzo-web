import APIRequestParams from './APIParams';

const fetcher = ([url, params]: [string, APIRequestParams]) => {
	if (url !== '')
		return fetch(url, {
			method: params.getMethod(),
			body: params.getBodyParamsString(),
		});
	else return Promise.resolve(undefined);
};

export default fetcher;
