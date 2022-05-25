import { Dispatch, useCallback } from 'react';
import APIRequestParams from '../../util/APIParams';
import useFetcher from '../useFetcher/useFetcher';

const buildUrl = (baseUrl: string, params?: APIRequestParams) =>
	params && params.getRoute()
		? `${baseUrl}${params.getRoute()}${params.getUrlParamsString()}`
		: '';

const useTrellzoAPI = function <T = any>(
	initialParams: APIRequestParams
): [
	T,
	Error | undefined,
	() => Promise<void>,
	(params?: APIRequestParams) => void
] {
	// TODO: use env variable
	const baseUrl = 'http://localhost:3000';

	const initialUrl = buildUrl(baseUrl, initialParams);

	const customHandler = useCallback(
		async (
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
		},
		[]
	);

	const [data, error, reload, changeParams] = useFetcher(
		initialUrl,
		initialParams,
		customHandler
	);

	const changeParamsWrapper = (params?: APIRequestParams) =>
		changeParams({
			url: buildUrl(baseUrl, params),
			params,
		});

	return [data as T, error, reload, changeParamsWrapper];
};

export default useTrellzoAPI;
