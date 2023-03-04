import APIRequestParams from '../util/APIParams';
import fetcher, { FetcherError } from '../util/throwingFetcher';

const baseUrl = process.env.REACT_APP_LOCAL
	? 'https://localhost'
	: 'https://api.trellzo.tech';

export const unprotectedRouteRequest = async (params: APIRequestParams) => {
	try {
		return await fetcher(baseUrl, params);
	} catch (e) {
		if (e instanceof FetcherError) {
			const response = e.response;
			const body = await response.json();
			if (response.status >= 400 && response.status < 600) {
				throw new APIError(
					`API Error: ${response.status} ${body.message}`,
					response,
					body
				);
			} else
				throw new APIError(
					`API Error: ${response.status} – unimplemented or invalid response status`,
					response,
					body
				);
		} else throw e;
	}
};

const refreshParams = new APIRequestParams('post');
refreshParams.setRoute('/auth/refresh');
Object.freeze(refreshParams);

export const protectedRouteRequest = async (params: APIRequestParams) => {
	try {
		return await unprotectedRouteRequest(params);
	} catch (e) {
		// The request errored
		if (e instanceof APIError) {
			// Try refresh creds if error is 401 Unauthorized
			if (e.response.status === 401) {
				try {
					// Refresh creds
					await fetcher(baseUrl, refreshParams);
					// And retry the request
					return await unprotectedRouteRequest(params);
				} catch (e) {
					// If refresh failed in the fetcher throw an APIError
					if (e instanceof FetcherError)
						throw new APIError(
							`API Error: Error while refreshing`,
							e.response,
							await e.response.json()
						);
					// Rethrow all other errors
					else throw e;
				}
			}
			// Rethrow all other errors
			else throw e;
		}
		// Rethrow when URL was empty
		else throw e;
	}
};

export class APIError extends FetcherError {
	constructor(message: string, response: Response, body: any) {
		super(message, response);
		this.body = body;
	}

	private _body: any;
	public get body(): any {
		return this._body;
	}
	public set body(v: any) {
		this._body = v;
	}
}
