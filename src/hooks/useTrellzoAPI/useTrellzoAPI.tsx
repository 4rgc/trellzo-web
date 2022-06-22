import { Dispatch, useCallback, useEffect, useState } from 'react';
import APIRequestParams from '../../util/APIParams';
import useFetcher from '../useFetcher/useFetcher';

const buildUrl = (baseUrl: string, params?: APIRequestParams) =>
	params && params.getRoute()
		? `${baseUrl}${params.getRoute()}${params.getUrlParamsString()}`
		: '';

const refreshParams = new APIRequestParams('post');
refreshParams.setRoute('/auth/refresh');

const customHandler = async (
	res: Response | undefined,
	setData: Dispatch<any>,
	setError: Dispatch<Error | undefined>
) => {
	if (!res) {
		setError(new Error('API Error: Empty response'));
		return;
	}

	if ([200, 201].includes(res.status)) {
		const data = await res.json();
		setData(data);
	} else if (res.status >= 400 && res.status < 600) {
		const body = await res.json();
		setError(new Error(`API Error: ${res.status} ${body.message}`));
	} else {
		setError(
			new Error(
				`API Error: ${res.status} – unimplemented or invalid response status`
			)
		);
	}
};

const useTrellzoAPI = function <T = any>(
	initialParams: APIRequestParams
): [
	T | undefined,
	Error | undefined,
	() => Promise<void>,
	(params?: APIRequestParams) => void
] {
	// TODO: use env variable
	const baseUrl = 'http://localhost:3000';
	const initialUrl = buildUrl(baseUrl, initialParams);

	const [data, setData] = useState<T | undefined>(undefined);
	const [error, setError] = useState<Error | undefined>(undefined);
	const [fetcherData, fetcherError, reload, setParamsAndUrl] = useFetcher(
		initialUrl,
		initialParams,
		customHandler
	);

	const changeParams = (params?: APIRequestParams) =>
		setParamsAndUrl({
			url: buildUrl(baseUrl, params),
			params,
		});

	useEffect(() => {
		setData(fetcherData);
		setError(undefined);
	}, [fetcherData]);

	useEffect(() => {
		if (fetcherError?.message) {
				setError(fetcherError);
		}
	}, [fetcherError, reload]);

	return [data, error, reload, changeParams];
};

export default useTrellzoAPI;
