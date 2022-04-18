import APIRequestParams from '../APIParams';

describe('APIParams', () => {
	describe('Constructor', () => {
		it('creates params with a specific method', () => {
			const params = new APIRequestParams('post');

			expect(params.getMethod()).toBe('post');
		});
	});

	describe('Body params', () => {
		it('stores and allows to retrieve the body params', () => {
			const params = new APIRequestParams();

			params.setBodyParam('hello', 'world');
			params.setBodyParams([
				['p1', 'v1'],
				['p3', 'v3'],
			]);

			expect(params.getBodyParam('p1')).toBe('v1');
			expect(params.getBodyParams(['hello', 'p1'])).toStrictEqual({
				hello: 'world',
				p1: 'v1',
			});
			expect(params.getBodyParams(['hello', 'p3'])).toStrictEqual({
				hello: 'world',
				p3: 'v3',
			});
		});
		it('returns the body params string', () => {
			const params = new APIRequestParams();

			params.setBodyParam('a', 'b');
			params.setBodyParams([
				['c', 'd'],
				['e', 'f'],
			]);

			expect(params.getBodyParamsString()).toBe(
				JSON.stringify({
					a: 'b',
					c: 'd',
					e: 'f',
				})
			);
		});

		it('returns an empty body string if no params are set', () => {
			const params = new APIRequestParams();

			expect(params.getBodyParamsString()).toBe('');
		});

		it('resets the body on method change', () => {
			const params = new APIRequestParams();
			params.setMethod('post');

			params.setBodyParam('a', 'b');
			expect(params.getBodyParam('a')).toBe('b');

			params.setMethod('get');
			expect(params.getBodyParam('a')).toBeUndefined();
		});

		it('removes the body param when set to undefined', () => {
			const params = new APIRequestParams();
			params.setBodyParams([
				['a', 'b'],
				['c', 'd'],
			]);

			params.setBodyParam('c', undefined);

			expect(params.getBodyParam('c')).toBeUndefined();

			params.setBodyParams([['a', undefined]]);
			expect(params.getBodyParam('a')).toBeUndefined();
		});

		it('keeps the body parameter if set to null/empty string/numeric 0', () => {
			const params = new APIRequestParams();
			params.setBodyParams([
				['a', 'b'],
				['c', 'd'],
				['e', 'f'],
				['g', 'h'],
				['i', 'j'],
				['k', 'l'],
			]);

			params.setBodyParam('a', null);
			expect(params.getBodyParam('a')).toBeNull();

			params.setBodyParam('c', '');
			expect(params.getBodyParam('c')).toBe('');

			params.setBodyParam('e', 0);
			expect(params.getBodyParam('e')).toBe(0);

			params.setBodyParams([
				['g', null],
				['i', ''],
				['k', 0],
			]);

			expect(params.getBodyParams(['g', 'i', 'k'])).toStrictEqual({
				g: null,
				i: '',
				k: 0,
			});
		});

		it('returns all body params if no keys are passed', () => {
			const params = new APIRequestParams();

			params.setBodyParams([
				['a', 'b'],
				['c', 'd'],
			]);

			expect(params.getBodyParams()).toStrictEqual({
				a: 'b',
				c: 'd',
			});
		});

		it('resets the body parameters if all of them are set to undefined', () => {
			const params = new APIRequestParams();

			params.setBodyParams([
				['a', 'b'],
				['c', 'd'],
			]);
			params.setBodyParams([
				['a', undefined],
				['c', undefined],
			]);

			expect(params.getBodyParamsString()).toBe('');
		});
	});

	describe('Url params', () => {
		it('stores and allows to retrieve the url params', () => {
			const params = new APIRequestParams();

			params.setUrlParam('hello', 'world');
			params.setUrlParams([
				['p1', 'v1'],
				['p3', 'v3'],
			]);

			expect(params.getUrlParam('p1')).toBe('v1');
			expect(params.getUrlParams(['hello', 'p1'])).toStrictEqual({
				hello: 'world',
				p1: 'v1',
			});
			expect(params.getUrlParams(['hello', 'p3'])).toStrictEqual({
				hello: 'world',
				p3: 'v3',
			});
		});

		it('removes the url param if set to an empty string', () => {
			const params = new APIRequestParams();

			params.setUrlParams([
				['a', 'b'],
				['c', 'd'],
			]);

			params.setUrlParam('a', '');

			expect(params.getUrlParam('a')).toBeUndefined();
			expect(params.getUrlParams(['a', 'c'])).toStrictEqual({
				c: 'd',
			});
		});

		it('returns the url params string', () => {
			const params = new APIRequestParams();

			params.setUrlParam('a', 'b');
			params.setUrlParams([
				['c', 'd'],
				['e', 'f'],
			]);

			expect(params.getUrlParamsString()).toBe('?a=b&c=d&e=f');
		});

		it('returns an empty url params string if no url params set', () => {
			const params = new APIRequestParams();

			expect(params.getUrlParamsString()).toBe('');
		});

		it('returns all url params if no keys are passed', () => {
			const params = new APIRequestParams();

			params.setUrlParams([
				['a', 'b'],
				['c', 'd'],
			]);

			expect(params.getUrlParams()).toStrictEqual({
				a: 'b',
				c: 'd',
			});
		});
	});

	describe('Method', () => {
		it('stores the http method', () => {
			const params = new APIRequestParams();

			expect(params.getMethod()).toBe('get');

			params.setMethod('post');
			expect(params.getMethod()).toBe('post');
		});
	});

	describe('Route', () => {
		it('defaults the route to undefined', () => {
			const params = new APIRequestParams();

			expect(params.getRoute()).toBeUndefined();
		});

		it('stores and allows to retrieve the route', () => {
			const params = new APIRequestParams();

			params.setRoute('/home');

			expect(params.getRoute()).toBe('/home');
		});

		it('resets the route if empty string is passed', () => {
			const params = new APIRequestParams();

			params.setRoute('/home');

			params.setRoute('');

			expect(params.getRoute()).toBeUndefined();
		});
	});
});
