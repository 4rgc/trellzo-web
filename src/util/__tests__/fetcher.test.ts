import APIRequestParams from '../APIParams';
import fetcher from '../fetcher';
import fetchMock from 'fetch-mock';

describe('fetcher', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	it('returns an undefined promise if url is an empty string', async () => {
		const params = new APIRequestParams();
		const url = '';

		expect(await fetcher(url, params)).toBeUndefined();
	});

	it('calls fetch with correct url', async () => {
		const params = new APIRequestParams();
		const url = 'fakeurl/';

		fetchMock.once(url, 200);

		const response = await fetcher(url, params);
		const status = response?.status;

		expect(status).toBe(200);
	});

	it('calls fetch with correct options', async () => {
		const params = new APIRequestParams();
		params.setMethod('post');
		params.setBodyParam('a', 'b');
		const url = 'fakeurl/';

		fetchMock.once({ url, body: { a: 'b' }, method: 'post' }, 200);

		const response = await fetcher(url, params);
		const status = response?.status;

		expect(status).toBe(200);
	});

	it('calls fetch with a content-type header', async () => {
		const params = new APIRequestParams();
		const url = 'fakeurl/';

		fetchMock.getOnce(
			{ url, headers: { 'Content-Type': 'application/json' } },
			200
		);

		const response1 = await fetcher(url, params);
		const status1 = response1?.status;

		expect(status1).toBe(200);
	});
});
