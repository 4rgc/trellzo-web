import _ from 'lodash';

type MethodType = 'get' | 'post' | 'delete' | 'patch';

export default class APIRequestParams {
	#method: MethodType = 'get';
	#urlParams: Record<string, string> = {};
	#bodyParams?: Record<string, any>;
	#route?: string;

	constructor(method?: MethodType) {
		if (method) this.#method = method;
	}

	setUrlParam(key: string, value: string) {
		if (value === '') delete this.#urlParams[key];
		else this.#urlParams[key] = value;
	}

	getUrlParam(key: string) {
		return this.#urlParams[key];
	}

	setUrlParams(params: [string, string][]) {
		for (const pair of params) {
			this.setUrlParam(...pair);
		}
	}

	getUrlParams(keys?: string[]) {
		const params: Record<string, string> = {};
		if (!keys) return _.cloneDeep(this.#urlParams);
		for (const key of keys) {
			if (this.#urlParams[key]) params[key] = this.#urlParams[key];
		}
		return params;
	}

	setBodyParam(key: string, value: any) {
		if (!this.#bodyParams) this.#bodyParams = {};

		if (value === undefined) delete this.#bodyParams[key];
		else this.#bodyParams[key] = value;

		if (!Object.keys(this.#bodyParams).length) this.#bodyParams = undefined;
	}

	getBodyParam(key: string): Record<string, any> | undefined {
		return this.#bodyParams && this.#bodyParams[key];
	}

	setBodyParams(params: [string, any][]) {
		for (const pair of params) this.setBodyParam(...pair);
	}

	getBodyParams(keys?: string[]) {
		const params: Record<string, any> = {};
		if (!keys) return _.cloneDeep(this.#bodyParams);
		for (const key of keys) {
			params[key] = this.getBodyParam(key);
		}
		return params;
	}

	getUrlParamsString() {
		return Object.keys(this.#urlParams).length
			? '?' +
					Object.keys(this.#urlParams)
						.map((k) => `${k}=${this.#urlParams[k]}`)
						.join('&')
			: '';
	}

	getBodyParamsString() {
		return this.#bodyParams ? JSON.stringify(this.#bodyParams) : '';
	}

	setMethod(method: MethodType) {
		this.#method = method;
		if (method !== 'post') {
			this.#bodyParams = undefined;
		} else {
			this.#bodyParams = {};
		}
	}

	getMethod() {
		return this.#method;
	}

	setRoute(route: string) {
		if (route === '') this.#route = undefined;
		else this.#route = route;
	}

	getRoute() {
		return this.#route;
	}
}
