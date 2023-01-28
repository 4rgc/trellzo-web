import APIRequestParams from './APIParams';

const buildUrl = (baseUrl: string, params?: APIRequestParams) =>
	params && params.getRoute()
		? `${baseUrl}${params.getRoute()}${params.getUrlParamsString()}`
		: '';

/**
 *
 * @param baseUrl Base url that is prepended to the route and url params
 * @param params Params for the request
 * @returns Response body parsed from JSON
 * @throws {FetcherError} Response was not OK
 * @throws {Error} Could not build the URL
 */
const fetcher = async (baseUrl: string, params: APIRequestParams) => {
	const url = buildUrl(baseUrl, params);

	let response;

	if (url === '')
		throw new Error(
			'Could not build the URL (params or params.getRoute() was null)'
		);
	response = await fetch(url, {
		method: params.getMethod(),
		body: params.getBodyParamsString(),
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});

	if (!response.ok) {
		throw new FetcherError(`Error ${response.status}`, response);
	}

	return response.json();
};

export class FetcherError extends Error {
	constructor(message: string, response: Response) {
		super(message);
		this._response = response;
	}

	private _response: Response;
	public get response(): Response {
		return this._response;
	}
}

export default fetcher;
