import useTrellzoAPI from '../useTrellzoAPI';
import useSWR from 'swr';
import APIRequestParams from '../../../util/APIParams';
const BASE_URL = 'localhost:3000';

jest.mock('swr');

describe('useTrellzoAPI', () => {
	const mockSwr = (res: any = { data: { status: 'ok' } }) => {
		(useSWR as jest.Mock).mockImplementationOnce(() => res);
	};

	it('passes empty string into useSWR when route is empty', () => {
		const params = new APIRequestParams();

		mockSwr();

		useTrellzoAPI(params);

		expect(useSWR).toHaveBeenCalledWith(
			['', params],
			expect.anything(),
			expect.anything()
		);
	});

	it('passes correct url into useSWR when route is set', () => {
		const params = new APIRequestParams();
		params.setRoute('/');

		mockSwr();

		useTrellzoAPI(params);

		expect(useSWR).toHaveBeenCalledWith(
			[`${BASE_URL}/`, params],
			expect.anything(),
			expect.anything()
		);
	});

	it('passes url params into useSWR', () => {
		const params = new APIRequestParams();
		params.setRoute('/');
		params.setUrlParam('a', 'b');

		mockSwr();

		useTrellzoAPI(params);

		expect(useSWR).toHaveBeenCalledWith(
			[`${BASE_URL}/?a=b`, params],
			expect.anything(),
			expect.anything()
		);
	});

	it('returns data and error from useSWR', () => {
		const params = new APIRequestParams();

		mockSwr({
			data: 'data',
			error: 'error',
		});

		const result = useTrellzoAPI(params);

		expect(result).toStrictEqual(['data', 'error']);
	});
});
