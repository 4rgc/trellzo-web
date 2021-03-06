import APIRequestParams from './APIParams';

const fetcher = (url: string, params: APIRequestParams) => {
	if (url !== '')
		return fetch(url, {
			method: params.getMethod(),
			body: params.getBodyParamsString(),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
	else return Promise.resolve(undefined);
};

export default fetcher;
